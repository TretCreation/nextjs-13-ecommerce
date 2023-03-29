import { IProduct } from '@/src/interfaces/product.interface'

export const paginate = (
	products: IProduct[],
	pageNumber: number,
	pageSize: number
) => {
	const startIndex = (pageNumber - 1) * pageSize
	return products.slice(startIndex, startIndex + pageSize)
}
