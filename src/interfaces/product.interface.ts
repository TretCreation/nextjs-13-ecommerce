export interface IProduct {
	id: number
	name: string
	price: number
	img: string
	rating: number
	brandId: number
	typeId: number
}

export interface IProductHomeProps {
	paginatedProducts: IProduct[]
	countedProducts: number
}

export interface IProductPage extends IProduct {
	brand?: { id: number; name: string }
	type?: { id: number; name: string }
	product_info?: {
		id: number
		productId: number
		title: string
		description: string
	}[]
	count: number
}
