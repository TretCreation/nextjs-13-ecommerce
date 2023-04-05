/* eslint-disable no-cond-assign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Wishlist {
	id: number
}

interface WishlistState {
	list: Wishlist[]
}

const initialState: WishlistState = {
	list: []
}

export const wishlistSlice = createSlice({
	name: 'wishlist',
	initialState,
	reducers: {
		toggleWishlist: (state, action: PayloadAction<any>) => {
			const product = action.payload

			if ((state = state.some(p => p.id === product.id)))
				state = state.filter(p => p.id !== product.id)
			else state.push(product)
		}
	}
})
