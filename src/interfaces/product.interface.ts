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
	products: IProduct[]
	paginatedProducts: IProduct[]
	countedProducts: number
}

export interface IProductPage extends IProduct {
	brand?: { id: number; name: string }
	type?: { id: number; name: string }
}
