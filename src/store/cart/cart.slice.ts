import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ICartState, ICartStateProps } from '@/src/interfaces/cart.interface'
import { CartService } from '@/src/services/CartService'

import { RootState } from '../store'

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
		{
			product,
			productId,
			userId
		}: { product: ICartStateProps; productId: number; userId: number },
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
		{
			product,
			productId,
			userId
		}: { product: ICartStateProps; productId: number; userId: number },
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
		{
			product,
			productId,
			userId
		}: { product: ICartStateProps; productId: number; userId: number },
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
export const incrementCountProducts = createAsyncThunk(
	'cart/incrementCountProducts',
	async function (
		{ productId, userId }: { productId: number; userId: number },
		{ rejectWithValue, dispatch, getState }
	) {
		const state = getState() as RootState
		try {
			const productIndex = state.cart.cartProducts.findIndex(p => p.id === productId)

			if (productIndex !== -1) {
				const updatedProducts = [...state.cart.cartProducts] // Create a new array with the existing products
				updatedProducts[productIndex] = {
					...updatedProducts[productIndex],
					count: updatedProducts[productIndex].count + 1 // Update the count property
				}

				await CartService.updateProductCount(
					productId,
					userId,
					updatedProducts[productIndex].count
				)
				dispatch(updateProducts(updatedProducts))
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

export const decrementCountProducts = createAsyncThunk(
	'cart/decrementCountProducts',
	async function (
		{ productId, userId }: { productId: number; userId: number },
		{ rejectWithValue, dispatch, getState }
	) {
		try {
			const state = getState() as RootState
			const productIndex = state.cart.cartProducts.findIndex(p => p.id === productId)

			if (productIndex !== -1) {
				const updatedProducts = [...state.cart.cartProducts]
				const product = { ...updatedProducts[productIndex] }

				if (product.count > 1) {
					product.count -= 1
					updatedProducts[productIndex] = product

					await CartService.updateProductCount(productId, userId, product.count)
					dispatch(updateProducts(updatedProducts))
				}
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

export const clearCartProducts = createAsyncThunk(
	'cart/clearCartProducts',
	async function (userId: number, { rejectWithValue, dispatch }) {
		try {
			await CartService.clearCart(userId)
			dispatch(clearCart())
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

export const { actions, reducer } = cartSlice
export const {
	toggleCart,
	addProduct,
	updateProducts,
	removeProduct,
	decrementCount,
	incrementCount,
	clearCart
} = actions
