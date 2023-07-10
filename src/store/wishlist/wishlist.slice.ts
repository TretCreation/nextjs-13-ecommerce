import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IProduct } from '@/src/interfaces/product.interface'
import { WishlistService } from '@/src/services/WishlistService'

import { RootState } from '../store'

interface IWishlistState {
	wishProducts: IProduct[]
}

const initialState: IWishlistState = {
	wishProducts: []
}

export const fetchProducts = createAsyncThunk(
	'wishlist/fetchProducts',
	async function (userId: number, { rejectWithValue, dispatch }) {
		try {
			const data = await WishlistService.getById(userId)
			dispatch(updateProducts(data))
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error('An error occurred:', error)
				return rejectWithValue(error.message)
			} else {
				console.error('An unexpected error occurred:', error)
				return rejectWithValue('An unexpected error occurred.')
			}
		}
	}
)

export const toggleWishlistProducts = createAsyncThunk(
	'wishlist/toggleWishlistProducts',
	async function (
		{ product, productId, userId }: { product: IProduct; productId: number; userId: number },
		{ rejectWithValue, dispatch, getState }
	) {
		try {
			const state = getState() as RootState
			const isExist = state.wishlist.wishProducts.some(p => p.id === product.id)

			if (isExist) {
				// Remove the product from the wishlist
				const updatedProducts = state.wishlist.wishProducts.filter(p => p.id !== product.id)
				await WishlistService.removeProduct(productId, userId)
				dispatch(wishlistSlice.actions.updateProducts(updatedProducts))
			} else {
				// Add the product to the wishlist
				await WishlistService.addProduct(productId, userId)
				dispatch(wishlistSlice.actions.addProduct(product))
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error('An error occurred:', error)
				return rejectWithValue(error.message)
			} else {
				console.error('An unexpected error occurred:', error)
				return rejectWithValue('An unexpected error occurred.')
			}
		}
	}
)

export const removeWishlistProducts = createAsyncThunk(
	'wishlist/removeWishlistProducts',
	async function (
		{ product, productId, userId }: { product: IProduct; productId: number; userId: number },
		{ rejectWithValue, dispatch, getState }
	) {
		const state = getState() as RootState
		try {
			const updatedProducts = state.wishlist.wishProducts.filter(p => p.id !== product.id)
			await WishlistService.removeProduct(productId, userId)
			dispatch(wishlistSlice.actions.updateProducts(updatedProducts))
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error('An error occurred:', error)
				return rejectWithValue(error.message)
			} else {
				console.error('An unexpected error occurred:', error)
				return rejectWithValue('An unexpected error occurred.')
			}
		}
	}
)

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

export const { actions, reducer } = wishlistSlice
export const { toggleWishlist, addProduct, updateProducts, removeProduct } = actions
