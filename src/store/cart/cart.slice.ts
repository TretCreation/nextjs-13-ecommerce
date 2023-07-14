import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ICartState, ICartStateProps } from '@/src/interfaces/cart.interface'

const initialState: ICartState = {
  cartProducts: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state, { payload: product }: PayloadAction<ICartStateProps>) {
      const isExist = state.cartProducts.some(p => p.id === product.id)

      if (isExist) {
        const index = state.cartProducts.findIndex(item => item.id === product.id)
        if (index !== -1) {
          state.cartProducts.splice(index, 1)
        }
      } else {
        const productWithCount = { ...product, count: 1 }
        state.cartProducts.push(productWithCount)
      }
    },
    addProduct(state, { payload: product }: PayloadAction<ICartStateProps>) {
      const productWithCount = { ...product, count: 1 }
      state.cartProducts.push(productWithCount)
    },
    removeProduct(state, { payload: product }: PayloadAction<ICartStateProps>) {
      const isExist = state.cartProducts.some(p => p.id === product.id)
      if (isExist) {
        const index = state.cartProducts.findIndex(item => item.id === product.id)
        if (index !== -1) {
          state.cartProducts.splice(index, 1)
        }
      }
    },
    updateProducts(state, { payload: products }: PayloadAction<ICartStateProps[]>) {
      const productsWithCount = products.map(product => ({ ...product }))
      state.cartProducts = productsWithCount
    },
    decrementCount(state, { payload: productId }: PayloadAction<number>) {
      const product = state.cartProducts.find(p => p.id === productId)
      if (product && product.count > 1) {
        product.count -= 1
      }
    },
    incrementCount(state, { payload: productId }: PayloadAction<number>) {
      const product = state.cartProducts.find(p => p.id === productId)
      if (product) {
        product.count += 1
      }
    },
    clearCart(state) {
      state.cartProducts = []
    }
  }
})

export const { reducer: cartReducer, actions: cartActions } = cartSlice
