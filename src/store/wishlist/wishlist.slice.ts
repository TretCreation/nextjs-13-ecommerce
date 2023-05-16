import { IProduct } from '@/src/interfaces/product.interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

			if (isExist) {
				const index = state.wishProducts.findIndex(item => item.id === product.id)
				if (index !== -1) {
					state.wishProducts.splice(index, 1)
				}
			} else state.wishProducts.push(product)
		},
		addProduct(state, { payload: product }: PayloadAction<IProduct>) {
			state.wishProducts.push(product)
		},
		removeProductWishlist(state, { payload: product }: PayloadAction<IProduct>) {
			const isExist = state.wishProducts.some(p => p.id === product.id)

			if (isExist) {
				const index = state.wishProducts.findIndex(item => item.id === product.id)
				if (index !== -1) {
					state.wishProducts.splice(index, 1)
				}
			}
		}
	}
})

export const { actions, reducer } = wishlistSlice
