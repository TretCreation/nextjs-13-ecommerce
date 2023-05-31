import { CrossIcon } from '@/public'
import { Button, Input, Modal } from '@/src/components'
import useDebounce from '@/src/components/hooks/useDebounce'
import { IBrand } from '@/src/interfaces/brand.interface'
import { IProduct } from '@/src/interfaces/product.interface'
import { IType } from '@/src/interfaces/type.interface'
import { BrandService } from '@/src/services/BrandService'
import { ProductService } from '@/src/services/ProductService'
import { SearchService } from '@/src/services/SearchService'
import { TypeService } from '@/src/services/TypeService'
import { FC, useCallback, useEffect, useState } from 'react'
import styles from './ModalProducts.module.scss'

interface IModalProductsProps {
	handleClose: () => void
	isOpen: boolean
}

const ModalProducts: FC<IModalProductsProps> = ({ handleClose, isOpen }) => {
	//* fetch
	const [dataType, setDataType] = useState<IType[]>([])
	const [dataBrand, setDataBrand] = useState<IBrand[]>([])

	//* add form
	const [name, setName] = useState<string>('')
	const [price, setPrice] = useState<number>(0)
	const [img, setImg] = useState<File>()
	const [typeId, setTypeId] = useState<number>(1)
	const [brandId, setBrandId] = useState<number>(1)

	//* remove form
	const [input, setInput] = useState<string>('')
	const [products, setProducts] = useState<IProduct[]>([])
	const debouncedSearchProducts = useDebounce<string>(input, 500)

	//* update form

	const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const img = e.target.files[0]

			setImg(img)
		}
	}

	const handleChangeType = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		setTypeId(Number(e.target.value))
	}, [])

	const handleChangeBrand = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		setBrandId(Number(e.target.value))
	}, [])

	const handleRemove = async (id: number) => {
		await ProductService.removeProduct(id)
		await fetchProducts(debouncedSearchProducts)
	}

	useEffect(() => {
		async function fetchTypes() {
			const types = await TypeService.getAllTypes()
			setDataType(types)
		}
		fetchTypes()
	}, [handleChangeType])

	useEffect(() => {
		async function fetchBrand() {
			const brands = await BrandService.getAllBrands()
			setDataBrand(brands)
		}
		fetchBrand()
	}, [handleChangeBrand])

	useEffect(() => {
		if (debouncedSearchProducts) {
			fetchProducts(debouncedSearchProducts)
		}
	}, [debouncedSearchProducts])

	const fetchProducts = async (input: string) => {
		const getSearchedProducts = await SearchService.getSearchedProducts(input)
		setProducts(getSearchedProducts)
	}

	const addProduct = async (event: any) => {
		if (!img) return

		const body = new FormData()
		body.append('name', name)
		body.append('price', `${price}`)
		body.append('file', img)
		body.append('brandId', `${brandId}`)
		body.append('typeId', `${typeId}`)

		await fetch('/api/admin/product/create', {
			method: 'POST',
			body
		})
	}

	if (!isOpen) return null

	return (
		<Modal wrapperId='react-portal-modal' handleClose={handleClose}>
			<CrossIcon className={styles.svg} />
			<div className={styles.add}>
				<div>
					<p>Enter the name of the product</p>
					<Input
						type='text'
						placeholder='Add name'
						appearance='solid'
						onChange={e => setName(e.target.value)}
					/>
				</div>
				<div>
					<p>Enter the price of the product</p>
					<Input
						type='number'
						min='1'
						step='any'
						placeholder='Add price'
						appearance='solid'
						onChange={e => setPrice(Number(e.target.value))}
					/>
				</div>
				<div>
					<p>Add image</p>
					<Input
						type='file'
						name='img'
						placeholder='Add image'
						// accept='image/*,.png,.jpg'

						onChange={handleUploadImage}
					/>
				</div>
				<div>
					<label htmlFor='type'>Type</label>
					<select name='type' value={typeId} onChange={handleChangeType}>
						{dataType.map(type => (
							<option key={type.id} value={type.id}>
								{type.name}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor='brand'>Brand</label>
					<select name='brand' value={brandId} onChange={handleChangeBrand}>
						{dataBrand.map(brand => (
							<option key={brand.id} value={brand.id}>
								{brand.name}
							</option>
						))}
					</select>
				</div>
				<Button appearance='primary' type='submit' onClick={addProduct}>
					Save
				</Button>
			</div>
			<div className={styles.remove}>
				<>REMOVE BLOCK</>
				<Input
					type='text'
					placeholder='Enter a product'
					appearance='solid'
					onChange={e => setInput(e.target.value)}
				/>
				{products.map(product => (
					<Button appearance='primary'>
						<div
							key={product.id}
							onClick={() => handleRemove(product.id)}
							className='mb-1'
						>
							{product.name}
						</div>
					</Button>
				))}
			</div>
			<div className={styles.edit}>
				<>Edit BLOCK</>
			</div>
		</Modal>
	)
}

export default ModalProducts
