import { CrossIcon } from '@/public'
import { Button, Input, Modal } from '@/src/components'
import useDebounce from '@/src/components/hooks/useDebounce'
import useOnClickOutside from '@/src/components/ui/modal/useOnClickOutside'
import { IBrand } from '@/src/interfaces/brand.interface'
import { IProduct } from '@/src/interfaces/product.interface'
import { IType } from '@/src/interfaces/type.interface'
import { BrandService } from '@/src/services/BrandService'
import { ProductService } from '@/src/services/ProductService'
import { SearchService } from '@/src/services/SearchService'
import { TypeService } from '@/src/services/TypeService'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
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
	const [inputUpdated, setInputUpdated] = useState<string>('')
	const [productsUpdated, setProductsUpdated] = useState<IProduct[]>([])
	const [idUpdated, setIdUpdated] = useState<number>()
	const [nameUpdated, setNameUpdated] = useState<string>('')
	const [priceUpdated, setPriceUpdated] = useState<number>(0)
	const [imgUpdated, setImgUpdated] = useState<File>()
	const [typeIdUpdated, setTypeIdUpdated] = useState<number>(1)
	const [brandIdUpdated, setBrandIdUpdated] = useState<number>(1)
	const debouncedSearchProductsUpdated = useDebounce<string>(inputUpdated, 500)

	const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const img = e.target.files[0]

			setImg(img)
		}
	}

	const handleUploadImageUpdated = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const img = e.target.files[0]

			setImgUpdated(img)
		}
	}

	const handleChangeType = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		setTypeId(Number(e.target.value))
	}, [])

	const handleChangeBrand = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		setBrandId(Number(e.target.value))
	}, [])

	const handleChangeTypeUpdated = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		setTypeIdUpdated(Number(e.target.value))
	}, [])

	const handleChangeBrandUpdated = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		setBrandIdUpdated(Number(e.target.value))
	}, [])

	const handleRemove = async (id: number) => {
		await ProductService.removeProduct(id)
		await fetchProducts(debouncedSearchProducts)
	}

	const handleUpdate = async (id: string) => {
		const res = await ProductService.getById(id)
		setProductsUpdated([])
		setInputUpdated('')
		setIdUpdated(res.id)
		setNameUpdated(res.name)
		setPriceUpdated(res.price)
		setTypeIdUpdated(res.typeId)
		setBrandIdUpdated(res.brandId)
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

	useEffect(() => {
		if (debouncedSearchProductsUpdated) {
			fetchProductsUpdate(debouncedSearchProductsUpdated)
		}
	}, [debouncedSearchProductsUpdated])

	const fetchProducts = async (input: string) => {
		const getSearchedProducts = await SearchService.getSearchedProducts(input)
		setProducts(getSearchedProducts)
	}

	const fetchProductsUpdate = async (input: string) => {
		const getSearchedProductsUpdated = await SearchService.getSearchedProducts(input)
		setProductsUpdated(getSearchedProductsUpdated)
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

	const updateProduct = async (event: any) => {
		if (!imgUpdated) return

		const body = new FormData()
		body.append('id', `${idUpdated}`)
		body.append('name', nameUpdated)
		body.append('price', `${priceUpdated}`)
		body.append('file', imgUpdated)
		body.append('brandId', `${brandIdUpdated}`)
		body.append('typeId', `${typeIdUpdated}`)

		await fetch('/api/admin/product/update', {
			method: 'POST',
			body
		})
	}
	const ref = useRef<HTMLDivElement>(null)

	useOnClickOutside(ref, () => handleProductsClose())

	const [isDivVisible, setDivVisible] = useState(true)

	const handleProductsClose = () => {
		setDivVisible(false)
	}

	if (!isOpen) return null

	return (
		<Modal wrapperId='react-portal-modal' handleClose={handleClose}>
			<CrossIcon className={styles.svg} onClick={handleClose} />
			<div className={styles.add}>
				<h1>Add Product</h1>
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
						//?
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
				<h1>Remove Product</h1>
				<Input
					type='text'
					placeholder='Enter a product'
					appearance='solid'
					onChange={e => setInput(e.target.value)}
				/>

				{isDivVisible && products.length !== 0 ? (
					<div className={styles.modallist} ref={ref}>
						{products.map(product => (
							<Button appearance='primary' className={styles.button}>
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
				) : (
					<></>
				)}
			</div>
			<div className={styles.edit}>
				<h1>Edit Product</h1>
				<div>
					<Input
						type='text'
						placeholder='Enter a product'
						appearance='solid'
						value={inputUpdated}
						onChange={e => setInputUpdated(e.target.value)}
					/>
				</div>
				{isDivVisible && productsUpdated.length !== 0 ? (
					<div className={styles.modallist} ref={ref}>
						{productsUpdated.map(product => (
							<Button appearance='primary' className={styles.button} key={product.id}>
								<div
									onClick={() => handleUpdate(String(product.id))}
									className='mb-1'
								>
									{product.name}
								</div>
							</Button>
						))}
					</div>
				) : (
					<></>
				)}
				<div>
					<p>Enter the name of the product</p>
					<Input
						type='text'
						placeholder='Add name'
						appearance='solid'
						value={nameUpdated}
						onChange={e => setNameUpdated(e.target.value)}
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
						value={priceUpdated}
						onChange={e => setPriceUpdated(Number(e.target.value))}
					/>
				</div>
				<div>
					<p>Add image</p>
					<Input
						type='file'
						name='img'
						placeholder='Add image'
						//?
						// accept='image/*,.png,.jpg'
						onChange={handleUploadImageUpdated}
					/>
				</div>
				<div>
					<label htmlFor='type'>Type</label>
					<select name='type' value={typeIdUpdated} onChange={handleChangeTypeUpdated}>
						{dataType.map(type => (
							<option key={type.id} value={type.id}>
								{type.name}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor='brand'>Brand</label>
					<select name='brand' value={brandIdUpdated} onChange={handleChangeBrandUpdated}>
						{dataBrand.map(brand => (
							<option key={brand.id} value={brand.id}>
								{brand.name}
							</option>
						))}
					</select>
				</div>
				<Button appearance='primary' type='submit' onClick={updateProduct}>
					Save
				</Button>
			</div>
		</Modal>
	)
}

export default ModalProducts
