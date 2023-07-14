import { createAsyncThunk } from '@reduxjs/toolkit'

import { IProduct } from '@/src/interfaces/product.interface'
import { WishlistService } from '@/src/services/WishlistService'
import { toastError } from '@/src/utils/api/handleToastError'

import { RootState } from '../store'
import { wishlistActions } from './wishlist.slice'

export const fetchProducts = createAsyncThunk(
  'wishlist/fetchProducts',
  async (userId: number, thunkAPI) => {
    try {
      const response = await WishlistService.getById(userId)
      thunkAPI.dispatch(wishlistActions.updateProducts(response))
      return response
    } catch (error: unknown) {
      toastError(error)
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const toggleWishlistProducts = createAsyncThunk(
  'wishlist/toggleWishlistProducts',
  async (
    { product, productId, userId }: { product: IProduct; productId: number; userId: number },
    thunkAPI
  ) => {
    try {
      const state = thunkAPI.getState() as RootState
      const isExist = state.wishlist.wishProducts.some(p => p.id === product.id)

      if (isExist) {
        // Remove the product from the wishlist
        const updatedProducts = state.wishlist.wishProducts.filter(p => p.id !== product.id)
        thunkAPI.dispatch(wishlistActions.updateProducts(updatedProducts))
        const response = await WishlistService.removeProduct(productId, userId)
        return response
      }
      // Add the product to the wishlist
      thunkAPI.dispatch(wishlistActions.addProduct(product))
      const response = await WishlistService.addProduct(productId, userId)
      return response
    } catch (error: unknown) {
      toastError(error)
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const removeWishlistProducts = createAsyncThunk(
  'wishlist/removeWishlistProducts',
  async (
    { product, productId, userId }: { product: IProduct; productId: number; userId: number },
    thunkAPI
  ) => {
    try {
      const state = thunkAPI.getState() as RootState
      const updatedProducts = state.wishlist.wishProducts.filter(p => p.id !== product.id)
      thunkAPI.dispatch(wishlistActions.updateProducts(updatedProducts))
      const response = await WishlistService.removeProduct(productId, userId)
      return response
    } catch (error: unknown) {
      toastError(error)
      return thunkAPI.rejectWithValue(error)
    }
  }
)
