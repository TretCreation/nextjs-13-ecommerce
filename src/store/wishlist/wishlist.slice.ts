import { IProduct } from '@/src/interfaces/product.interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WishlistState {
	products: IProduct[]
}

const initialState: WishlistState = {
	products: []
}

export const wishlistSlice = createSlice({
	name: 'wishlist',
	initialState,
	reducers: {
		toggleWishlist(state, action: PayloadAction<IProduct>) {
			const product = action.payload
			console.log('product', product)

			const ifExist = state.some((p: number) => p.id === product.id)

			if (ifExist) state = state.filter(p => p.id !== product.id)
			else state.push(product)
		}
	}
})

export default wishlistSlice.reducer
