import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IProduct } from '@/src/interfaces/product.interface'

interface IWishlistState {
  wishProducts: IProduct[]
}

const initialState: IWishlistState = {
  wishProducts: []
}

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist(state, { payload: product }: PayloadAction<IProduct>) {
      const isExist = state.wishProducts.some(p => p.id === product.id)
      console.log('isExist', isExist)

      if (isExist) {
        const index = state.wishProducts.findIndex(item => item.id === product.id)
        console.log('index', index)
        if (index !== -1) {
          state.wishProducts.splice(index, 1)
        }
      } else state.wishProducts.push(product)
    },
    addProduct(state, { payload: product }: PayloadAction<IProduct>) {
      state.wishProducts.push(product)
    },
    removeProduct(state, { payload: product }: PayloadAction<IProduct>) {
      const isExist = state.wishProducts.some(p => p.id === product.id)

      if (isExist) {
        const index = state.wishProducts.findIndex(item => item.id === product.id)
        if (index !== -1) {
          state.wishProducts.splice(index, 1)
        }
      }
    },
    updateProducts(state, { payload: products }: PayloadAction<IProduct[]>) {
      state.wishProducts = products
    }
  }
  // extraReducers: {
  // 	[fetchProducts.pending]: state => {
  // 		state.status = 'loading'
  // 		state.error = null
  // 	},
  // 	[fetchProducts.fulfilled]: (state, action) => {
  // 		state.status = 'resolved'
  // 		state.todos = action.payload
  // 	},
  // 	[fetchProducts.rejected]: setError,
  // 	[fetchProducts.rejected]: setError,
  // 	[fetchProducts.rejected]: setError
  // }
})

export const { reducer: wishlistReducer, actions: wishlistActions } = wishlistSlice
