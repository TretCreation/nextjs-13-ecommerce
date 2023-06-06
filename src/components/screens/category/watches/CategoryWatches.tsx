import { Button, Input, ProductItem, SortBy } from '@/src/components'
import { IBrand } from '@/src/interfaces/brand.interface'
import { IProduct } from '@/src/interfaces/product.interface'
import { BrandService } from '@/src/services/BrandService'
import { FC, useState } from 'react'
import NoProducts from '../../product/product-empty/NoProducts'
import styles from './CategoryWatches.module.scss'

interface ICategoryWatchesProps {
	watches: IProduct[]
}

const CategoryWatches: FC<ICategoryWatchesProps> = ({ watches }) => {
	const [products, setProducts] = useState<IProduct[]>(watches)
	const [currentPage, setCurrentPage] = useState<number>(1)

	const [brands, setBrands] = useState<IBrand[]>([])
	const [brandId, setBrandId] = useState<number[]>([])

	BrandService.getAllBrands().then(brands => setBrands(brands))

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
			<div className={styles.filter}>
				<p className={styles.text}>Brands:</p>
				<div className='flex flex-col'>
					{brands.map(brand => (
						<Button
							appearance='solid'
							onClick={e => {
								if (e.detail === 1) {
									handleSubmitBrandId(brand)
								}
								handleSubmitBrandId(brand)
							}}
							key={brand.id}
						>
							<label className={styles.label}>
								{/* <Input type='checkbox' /> */}
								<p className={styles.brand}>{brand.name}</p>
							</label>
						</Button>
					))}
				</div>
			</div>
			<div>
				<SortBy
					limit={16}
					q={3}
					brandId={brandId}
					currentPage={currentPage}
					setCurrentPage={currentPage => setCurrentPage(currentPage)}
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
				<Button appearance='primary' onClick={() => setCurrentPage(currentPage + 1)}>
					<p>Load more </p>
				</Button>
			</div>
		</div>
	)
}

export default CategoryWatches
