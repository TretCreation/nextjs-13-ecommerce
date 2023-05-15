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
	const [name, setName] = useState<string>('')
	const [price, setPrice] = useState<number>(0)
	const [img, setImg] = useState<File>()
	const [typeId, setTypeId] = useState<number>(1)
	const [brandId, setBrandId] = useState<number>(1)
	const [dataType, setDataType] = useState<IType[]>([])
	const [dataBrand, setDataBrand] = useState<IBrand[]>([])

	const [input, setInput] = useState<string>('')
	const [products, setProducts] = useState<IProduct[]>([])

	const debouncedSearchProducts = useDebounce<string>(input, 500)

	const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files != null) {
			setImg(e.target.files[0])
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

	const addProduct = async () => {
		// await ProductService.createProduct(name, price, img, brandId, typeId)
		if (!img) return

		const formData = new FormData()
		// formData.append('name', name)
		// formData.append('price', `${price}`)
		formData.append('img', img)
		// formData.append('brandId', `${brandId}`)
		// formData.append('typeId', `${typeId}`)

		await ProductService.uploadImage(formData)
		// const test = { name, price, img, brandId, typeId }
		// console.log(test)
	}

	if (!isOpen) return null

	return (
		<Modal wrapperId='react-portal-modal' handleClose={handleClose}>
			<CrossIcon />
			<div className={styles.add}>
				{/* Name input field */}
				<div>
					<p>Enter the name of the product</p>
					<Input
						type='text'
						placeholder='Add name'
						onChange={e => setName(e.target.value)}
					/>
				</div>
				{/* Price input field */}
				<div>
					<p>Enter the price of the product</p>
					<Input
						type='number'
						min='1'
						step='any'
						placeholder='Add price'
						accept='image/*,.png,.jpg'
						onChange={e => setPrice(Number(e.target.value))}
					/>
				</div>
				{/* Picture input field */}
				<div>
					<p>Add image</p>
					<Input
						type='file'
						name='img'
						placeholder='Add image'
						onChange={handleUploadImage}
					/>
				</div>
				{/* Type input field */}
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
				{/* Brand input field */}
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
				<Button appearance='primary' onClick={addProduct}>
					Add a product
				</Button>
			</div>
			<div className={styles.remove}>
				<Input
					type='text'
					placeholder='Enter a product'
					onChange={e => setInput(e.target.value)}
				/>
				{products.map(product => (
					//TODO: Add list (список HTML CSS) + close when handleRemove is success
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
			<div className={styles.edit}></div>
		</Modal>
	)
}

export default ModalProducts
