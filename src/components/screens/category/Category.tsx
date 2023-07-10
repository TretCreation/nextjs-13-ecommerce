import { FC, useEffect, useState } from 'react'

import { Button, ProductItem, SortBy } from '@/src/components'
import { IBrand } from '@/src/interfaces/brand.interface'
import { IProduct } from '@/src/interfaces/product.interface'
import { BrandService } from '@/src/services/BrandService'
import { TypeService } from '@/src/services/TypeService'

import NoProducts from '../product/product-empty/NoProducts'
import styles from './Category.module.scss'

const Category: FC<{ category: string }> = ({ category }) => {
	console.log('category', category)
	const [products, setProducts] = useState<IProduct[]>([])
	const [currentPage, setCurrentPage] = useState<number>(1)

	const [brands, setBrands] = useState<IBrand[]>([])
	const [types, setTypes] = useState<IBrand[]>([])
	const [brandId, setBrandId] = useState<number[]>([])

	useEffect(() => {
		BrandService.getAllBrands().then(brands => setBrands(brands))
		TypeService.getAllTypes().then(types => setTypes(types))
	}, [])

	const handleClick = (e: any) => {
		e.currentTarget.classList.toggle(styles.btncategorycolor)
	}

	const handleSubmitBrandId = (brand: any) => {
		if (brandId.includes(brand.id)) {
			setBrandId(brandId.filter((id: any) => id !== brand.id))
		} else {
			setBrandId([...brandId, brand.id])
		}
		setCurrentPage(1)
	}

	return (
		<div className={styles.category}>
			{types.map(type => {
				if (type.name.toLowerCase() === category) {
					return (
						<div className={styles.category} key={type.name}>
							<div className={styles.filter}>
								<p className={styles.text}>Brands:</p>
								<div className='flex flex-col'>
									{brands.map(brand => (
										<Button
											className={styles.btncategory}
											appearance='solid'
											onClick={e => {
												if (e.detail === 1) {
													handleSubmitBrandId(brand)
												}
												handleClick(e)
											}}
											key={brand.id}
										>
											{brand.name}
										</Button>
									))}
								</div>
							</div>
							<div>
								<SortBy
									limit={16}
									q={type.id}
									brandId={brandId}
									currentPage={currentPage}
									setCurrentPage={setCurrentPage}
									getProducts={products => setProducts(products)}
								/>
								<div className={styles.products}>
									{products.length ? (
										products.map((product: IProduct) => (
											<ProductItem key={product.id} product={product} />
										))
									) : (
										<NoProducts />
									)}
								</div>
								<Button
									appearance='primary'
									onClick={() => setCurrentPage(currentPage + 1)}
								>
									<p>Load more</p>
								</Button>
							</div>
						</div>
					)
				}
				return null
			})}
		</div>
	)
}

export default Category
