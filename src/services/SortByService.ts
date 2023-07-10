import axios from 'axios'

import { sortKey, sortValue, typeId } from '../interfaces/api.type'
import { IProduct } from '../interfaces/product.interface'

axios.defaults.baseURL = process.env.API_URL

export const SortByService = {
	async getSortedProducts(
		k: sortKey,
		v: sortValue,
		q: typeId,
		limit: number,
		page: number,
		brandId?: number | number[] | undefined
	) {
		try {
			if (brandId !== undefined) {
				const res = await axios.get<IProduct[]>(
					`/sort?q=${q}&${k}=${v}&limit=${limit}&page=${page}&brandId=${brandId}`
				)
				return res.data
			}
			const res = await axios.get<IProduct[]>(
				`/sort?q=${q}&${k}=${v}&limit=${limit}&page=${page}`
			)
			return res.data
		} catch (error) {
			console.log(error)
			throw error
		}
	}
}
