import { Button, Input, ProductItem, SortBy } from '@/src/components'
import { IBrand } from '@/src/interfaces/brand.interface'
import { IProduct } from '@/src/interfaces/product.interface'
import { BrandService } from '@/src/services/BrandService'
import { FC, useEffect, useState } from 'react'
import NoProducts from '../../product/product-empty/NoProducts'
import styles from './CategorySmartphones.module.scss'
interface ICategorySmartphonesProps {
	smartphones: IProduct[]
}

const CategorySmartphones: FC<ICategorySmartphonesProps> = ({ smartphones }) => {
	const [products, setProducts] = useState<IProduct[]>(smartphones)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [brands, setBrands] = useState<IBrand[]>([])
	const [brandId, setBrandId] = useState<number>()

	useEffect(() => {
		async function fetchData() {
			const res = await BrandService.getAllBrands()
			setBrands(res)
		}
		fetchData()
	}, [])

	return (
		<div className={styles.category}>
			<div className={styles.filter}>
				<div className='flex flex-col'>
					<p>Brands:</p>
					{brands.map(brand => (
						<div className='flex flex-row'>
							<Input type='checkbox' />
							<Button appearance='solid' onClick={() => setBrandId(brand.id)}>
								<p className='text-black'>{brand.name}</p>
							</Button>
						</div>
					))}
				</div>
			</div>
			<div>
				<SortBy
					limit={16}
					q={1}
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

export default CategorySmartphones
