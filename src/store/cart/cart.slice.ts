import { IProduct } from '@/src/interfaces/product.interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ICartState {
	cartProducts: IProduct[]
}

const initialState: ICartState = {
	cartProducts: []
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		toggleCart(state, { payload: product }: PayloadAction<IProduct>) {
			const isExist = state.cartProducts.some(p => p.id === product.id)

			if (isExist) {
				const index = state.cartProducts.findIndex(
					item => item.id === product.id
				)
				if (index !== -1) {
					state.cartProducts.splice(index, 1)
				}
			} else state.cartProducts.push(product)
		},
		addProduct(state, { payload: product }: PayloadAction<IProduct>) {
			state.cartProducts.push(product)
		},
		removeProductCart(
			state,
			{ payload: product }: PayloadAction<IProduct>
		) {
			const isExist = state.cartProducts.some(p => p.id === product.id)
			if (isExist) {
				const index = state.cartProducts.findIndex(
					item => item.id === product.id
				)
				if (index !== -1) {
					state.cartProducts.splice(index, 1)
				}
			}
		}
	}
})

export const { actions, reducer } = cartSlice
