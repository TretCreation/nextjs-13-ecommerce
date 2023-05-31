import { Button, Input, ProductItem, SortBy } from '@/src/components'
import { IBrand } from '@/src/interfaces/brand.interface'
import { IProduct } from '@/src/interfaces/product.interface'
import { BrandService } from '@/src/services/BrandService'
import { FC, useCallback, useEffect, useState } from 'react'
import NoProducts from '../../product/product-empty/NoProducts'
import styles from './CategorySmartphones.module.scss'
interface ICategorySmartphonesProps {
	smartphones: IProduct[]
}

const CategorySmartphones: FC<ICategorySmartphonesProps> = ({ smartphones }) => {
	const [products, setProducts] = useState<IProduct[]>(smartphones)
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [brands, setBrands] = useState<IBrand[]>([])
	const [brandId, setBrandId] = useState<number[]>([])

	useEffect(() => {
		async function fetchData() {
			const res = await BrandService.getAllBrands()
			setBrands(res)
		}
		fetchData()
	}, [])

	// useEffect(() => {
	// 	console.log('brandId: useEffect', brandId)
	// 	setCurrentPage(1)
	// }, [brandId])

	const handleSubmitBrandId = useCallback(
		(brand: any) => {
			if (brandId.includes(brand.id)) {
				// If the brand ID is already in the brandId array, remove it
				setBrandId(brandId.filter((id: any) => id !== brand.id))
			} else {
				// If the brand ID is not in the brandId array, add it
				setBrandId([...brandId, brand.id])
			}
		},
		[brandId]
	)

	return (
		<div className={styles.category}>
			<div className={styles.filter}>
				<p className={styles.text}>Brands:</p>
				<div className='flex flex-col'>
					{brands.map(brand => (
						<Button
							appearance='solid'
							onClick={e => {
								// e.stopPropagation()
								handleSubmitBrandId(brand)
							}}
							key={brand.id}
						>
							<label className={styles.label}>
								<Input type='checkbox' />
								<p className={styles.brand}>{brand.name}</p>
							</label>
						</Button>
					))}
				</div>
			</div>
			<div>
				<SortBy
					limit={8}
					q={1}
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

export default CategorySmartphones
