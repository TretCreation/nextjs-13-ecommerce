import { combineReducers } from '@reduxjs/toolkit'

import { cartReducer } from './cart/cart.slice'
import { wishlistReducer } from './wishlist/wishlist.slice'

export const reducers = combineReducers({
  wishlist: wishlistReducer,
  cart: cartReducer
})
