import { cartActions } from './cart/cart.slice'
import { wishlistActions } from './wishlist/wishlist.slice'

export const actions = {
  wishlist: wishlistActions,
  cart: cartActions
}
