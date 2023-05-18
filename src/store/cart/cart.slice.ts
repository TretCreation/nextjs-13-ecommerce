import { IProduct } from '@/src/interfaces/product.interface'
import { CartService } from '@/src/services/CartService'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface ICartState {
	cartProducts: IProduct[]
}

const initialState: ICartState = {
	cartProducts: []
}

export const fetchProducts = createAsyncThunk(
	'cart/fetchProducts',
	async function (userId: number, { rejectWithValue, dispatch }) {
		try {
			const data = await CartService.getById(userId)
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

export const toggleCartProducts = createAsyncThunk(
	'cart/toggleCartProducts',
	async function (
		{ product, productId, userId }: { product: IProduct; productId: number; userId: number },
		{ rejectWithValue, dispatch, getState }
	) {
		try {
			const state = getState() as RootState
			const isExist = state.cart.cartProducts.some(p => p.id === product.id)

			if (isExist) {
				// Remove the product from the cart
				const updatedProducts = state.cart.cartProducts.filter(p => p.id !== product.id)
				await CartService.removeProduct(productId, userId)
				dispatch(cartSlice.actions.updateProducts(updatedProducts))
			} else {
				// Add the product to the cart
				await CartService.addProduct(productId, userId)
				dispatch(cartSlice.actions.addProduct(product))
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

export const addCartProducts = createAsyncThunk(
	'cart/addCartProducts',
	async function (
		{ product, productId, userId }: { product: IProduct; productId: number; userId: number },
		{ rejectWithValue, dispatch }
	) {
		try {
			await CartService.addProduct(productId, userId)
			dispatch(cartSlice.actions.addProduct(product))
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

export const removeCartProducts = createAsyncThunk(
	'cart/removeCartProducts',
	async function (
		{ product, productId, userId }: { product: IProduct; productId: number; userId: number },
		{ rejectWithValue, dispatch, getState }
	) {
		const state = getState() as RootState
		try {
			const updatedProducts = state.cart.cartProducts.filter(p => p.id !== product.id)
			await CartService.removeProduct(productId, userId)
			dispatch(cartSlice.actions.updateProducts(updatedProducts))
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

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		toggleCart(state, { payload: product }: PayloadAction<IProduct>) {
			const isExist = state.cartProducts.some(p => p.id === product.id)

			if (isExist) {
				const index = state.cartProducts.findIndex(item => item.id === product.id)
				if (index !== -1) {
					state.cartProducts.splice(index, 1)
				}
			} else state.cartProducts.push(product)
		},
		addProduct(state, { payload: product }: PayloadAction<IProduct>) {
			state.cartProducts.push(product)
		},
		removeProduct(state, { payload: product }: PayloadAction<IProduct>) {
			const isExist = state.cartProducts.some(p => p.id === product.id)
			if (isExist) {
				const index = state.cartProducts.findIndex(item => item.id === product.id)
				if (index !== -1) {
					state.cartProducts.splice(index, 1)
				}
			}
		},
		updateProducts(state, { payload: products }: PayloadAction<IProduct[]>) {
			state.cartProducts = products
		}
	}
})

export const { actions, reducer } = cartSlice
export const { toggleCart, addProduct, updateProducts, removeProduct } = actions
