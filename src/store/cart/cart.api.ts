import { createAsyncThunk } from '@reduxjs/toolkit'

import { ICartStateProps } from '@/src/interfaces/cart.interface'
import { CartService } from '@/src/services/CartService'
import { toastError } from '@/src/utils/api/handleToastError'

import { RootState } from '../store'
import { cartActions } from './cart.slice'

export const fetchProducts = createAsyncThunk(
  'cart/fetchProducts',
  async (userId: number, thunkAPI) => {
    try {
      const response = await CartService.getById(userId)
      thunkAPI.dispatch(cartActions.updateProducts(response))
      return response
    } catch (error: unknown) {
      toastError(error)
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const toggleCartProducts = createAsyncThunk(
  'cart/toggleCartProducts',
  async (
    { product, productId, userId }: { product: ICartStateProps; productId: number; userId: number },
    thunkAPI
  ) => {
    try {
      const state = thunkAPI.getState() as RootState
      const isExist = state.cart.cartProducts.some(p => p.id === product.id)

      if (isExist) {
        // Remove the product from the cart
        const updatedProducts = state.cart.cartProducts.filter(p => p.id !== product.id)
        thunkAPI.dispatch(cartActions.updateProducts(updatedProducts))
        const response = await CartService.removeProduct(productId, userId)
        return response
      }
      // Add the product to the cart
      thunkAPI.dispatch(cartActions.addProduct(product))
      const response = await CartService.addProduct(productId, userId)
      return response
    } catch (error: unknown) {
      toastError(error)
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const addCartProducts = createAsyncThunk(
  'cart/addCartProducts',
  async (
    { product, productId, userId }: { product: ICartStateProps; productId: number; userId: number },
    thunkAPI
  ) => {
    try {
      thunkAPI.dispatch(cartActions.addProduct(product))
      const response = await CartService.addProduct(productId, userId)
      return response
    } catch (error: unknown) {
      toastError(error)
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const removeCartProducts = createAsyncThunk(
  'cart/removeCartProducts',
  async (
    { product, productId, userId }: { product: ICartStateProps; productId: number; userId: number },
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as RootState
    try {
      const updatedProducts = state.cart.cartProducts.filter(p => p.id !== product.id)
      thunkAPI.dispatch(cartActions.updateProducts(updatedProducts))
      const response = await CartService.removeProduct(productId, userId)
      return response
    } catch (error: unknown) {
      toastError(error)
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const incrementCountProducts = createAsyncThunk(
  'cart/incrementCountProducts',
  async ({ productId, userId }: { productId: number; userId: number }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    try {
      const productIndex = state.cart.cartProducts.findIndex(p => p.id === productId)

      if (productIndex !== -1) {
        const updatedProducts = [...state.cart.cartProducts] // Create a new array with the existing products
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          count: updatedProducts[productIndex].count + 1 // Update the count property
        }

        thunkAPI.dispatch(cartActions.updateProducts(updatedProducts))
        const response = await CartService.updateProductCount(
          productId,
          userId,
          updatedProducts[productIndex].count
        )
        return response
      }
      return null
    } catch (error: unknown) {
      toastError(error)
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const decrementCountProducts = createAsyncThunk(
  'cart/decrementCountProducts',
  async ({ productId, userId }: { productId: number; userId: number }, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState
      const productIndex = state.cart.cartProducts.findIndex(p => p.id === productId)

      if (productIndex !== -1) {
        const updatedProducts = [...state.cart.cartProducts]
        const product = { ...updatedProducts[productIndex] }

        if (product.count > 1) {
          product.count -= 1
          updatedProducts[productIndex] = product

          thunkAPI.dispatch(cartActions.updateProducts(updatedProducts))
          const response = await CartService.updateProductCount(productId, userId, product.count)
          return response
        }
      }
      return null
    } catch (error: unknown) {
      toastError(error)
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const clearCartProducts = createAsyncThunk(
  'cart/clearCartProducts',
  async (userId: number, thunkAPI) => {
    try {
      thunkAPI.dispatch(cartActions.clearCart())
      const response = await CartService.clearCart(userId)
      return response
    } catch (error: unknown) {
      toastError(error)
      return thunkAPI.rejectWithValue(error)
    }
  }
)
