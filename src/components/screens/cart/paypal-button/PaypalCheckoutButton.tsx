import { OrderResponseBody } from '@paypal/paypal-js/types/apis/orders'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { FC } from 'react'

import { useAppDispatch } from '@/src/components'
import { getCheckoutUrl } from '@/src/configs/url.config'
import { ICartPayment } from '@/src/interfaces/cart.interface'
import { AuthService } from '@/src/services/auth.service'
import { PaymentService } from '@/src/services/payment.service'
import { clearCartProducts } from '@/src/store/cart/cart.api'
import { actions } from '@/src/store/rootActions'
import { toastError } from '@/src/utils/api/handleToastError'
import { generatePassword } from '@/src/utils/auth/generatePassword'

interface IPaypalCheckoutButtonProps {
  subtotal: number
  userId: number | undefined
  email: string
  phone: number
  cartProducts: ICartPayment[]
}

const PaypalCheckoutButton: FC<IPaypalCheckoutButtonProps> = ({
  subtotal,
  userId,
  cartProducts,
  email,
  phone
}) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { status } = useSession()

  function successPage(orderId: string) {
    router
      .push({ pathname: getCheckoutUrl('/success'), query: { orderId } })
      .catch((error: Error) => toastError(error.message))
  }

  const handleApprove = async (order: OrderResponseBody) => {
    if (!userId) {
      const password = generatePassword()

      const user = await AuthService.createUser('Unauthorized user', email, password)

      const paymentData = await PaymentService.approvePayment(
        user.body.id,
        order?.status,
        order?.id,
        subtotal,
        order?.create_time,
        order?.update_time
      )
      cartProducts.map(async product => {
        await PaymentService.addOrderProduct(paymentData, product.id, product.count)
      })

      await PaymentService.sendEmail(email, order?.status, subtotal, cartProducts)
      const resViber = await PaymentService.sendViber(phone, order?.id)
      if (!resViber) await PaymentService.sendSMS(phone, order?.id)

      dispatch(actions.cart.clearCart())
    } else {
      const paymentData = await PaymentService.approvePayment(
        userId,
        order?.status,
        order?.id,
        subtotal,
        order?.create_time,
        order?.update_time
      )
      cartProducts.map(async product => {
        await PaymentService.addOrderProduct(paymentData, product.id, product.count)
      })

      await PaymentService.sendEmail(email, order?.status, subtotal, cartProducts)
      const resViber = await PaymentService.sendViber(phone, order?.id)
      if (!resViber) await PaymentService.sendSMS(phone, order?.id)

      // ? need clearCartProducts?
      if (status === 'authenticated') {
        dispatch(clearCartProducts(userId))
      }
    }
    successPage(order?.id)
  }

  return (
    <PayPalScriptProvider
      options={{
        'client-id': process.env.PAYPAL_CLIENT_ID as string,
        currency: 'USD'
      }}
    >
      <PayPalButtons
        style={{ layout: 'horizontal', color: 'gold', shape: 'rect', label: 'checkout' }}
        key={cartProducts.length}
        forceReRender={cartProducts}
        createOrder={(data, actions) =>
          actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: String(subtotal),
                  breakdown: {
                    item_total: {
                      currency_code: 'USD',
                      value: String(subtotal)
                    }
                  }
                },
                items: cartProducts.map(product => ({
                  name: product.name,
                  unit_amount: {
                    currency_code: 'USD',
                    value: String(product.price)
                  },
                  quantity: String(product.count)
                })),
                description: 'TretStore Order'
              }
            ]
          })
        }
        onApprove={async (_, actions) => {
          const order = await actions.order?.capture()
          if (order) handleApprove(order).catch((error: Error) => toastError(error.message))
        }}
        // ? Check later (tests)
        onError={err => {
          toastError(err)
        }}
      />
    </PayPalScriptProvider>
  )
}

export default PaypalCheckoutButton
