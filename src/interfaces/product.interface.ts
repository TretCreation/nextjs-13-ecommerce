export interface IProduct {
	id: number
	name: string
	price: number
	img: string
	rating: number
	brandId: number
	typeId: number
}

export interface IProductSingle extends IProduct {
	brand?: { id: number; name: string }
	type?: { id: number; name: string }
}

export interface IProductProps {
	products: IProduct[]
}

export interface IProductSingleProps {
	product: IProductSingle
}
