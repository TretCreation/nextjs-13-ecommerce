export interface IProduct {
	id: number
	name: string
	price: number
	img: string
	rating: string
	brandId: number
	typeId: number
}

export interface IProductProps {
	products: IProduct[]
}

export interface IProductItemProps {
	product: IProduct
}
