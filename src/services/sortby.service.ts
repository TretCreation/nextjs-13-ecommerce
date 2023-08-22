import axios from 'axios'

import { SortKey, SortValue, TypeId } from '../interfaces/api.type'
import { IProduct } from '../interfaces/product.interface'

axios.defaults.baseURL = process.env.API_URL

export const SortByService = {
  async getSortedProducts(
    k: SortKey,
    v: SortValue,
    q: TypeId,
    limit: number,
    page: number,
    brandId?: number | undefined
  ) {
    try {
      if (brandId !== undefined) {
        const res = await axios.get<IProduct[]>(
          `/sort?q=${q}&${k}=${v}&limit=${limit}&page=${page}&brandId=${brandId}`
        )
        return res.data
      }
      const res = await axios.get<IProduct[]>(`/sort?q=${q}&${k}=${v}&limit=${limit}&page=${page}`)
      return res.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
