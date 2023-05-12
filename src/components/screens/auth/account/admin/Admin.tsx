import Button from '@/src/components/ui/button/Button'
import { useState } from 'react'
import styles from './Admin.module.scss'
import ModalBrands from './modals/ModalBrands'
import ModalProducts from './modals/ModalProducts'
import ModalTypes from './modals/ModalTypes'

const Admin = () => {
	const [isModalProductsOpen, setIsModalProductsOpen] = useState<boolean>(false)
	const [isModalBrandsOpen, setIsModalBrandsOpen] = useState<boolean>(false)
	const [isModalTypesOpen, setIsModalTypesOpen] = useState<boolean>(false)

	return (
		<>
			<div className={styles.wrapper}>
				<Button
					appearance='primary'
					className={styles.btn}
					onClick={() => setIsModalProductsOpen(!isModalProductsOpen)}
				>
					Add / Remove a product
				</Button>
				<Button
					appearance='primary'
					className={styles.btn}
					onClick={() => setIsModalBrandsOpen(!isModalBrandsOpen)}
				>
					Add / Remove a brand
				</Button>
				<Button
					appearance='primary'
					className={styles.btn}
					onClick={() => setIsModalTypesOpen(!isModalTypesOpen)}
				>
					Add / Remove a type
				</Button>
			</div>
			<ModalProducts
				handleClose={() => setIsModalProductsOpen(!isModalProductsOpen)}
				isOpen={isModalProductsOpen}
			/>
			<ModalTypes
				handleClose={() => setIsModalBrandsOpen(!isModalBrandsOpen)}
				isOpen={isModalBrandsOpen}
			/>
			<ModalBrands
				handleClose={() => setIsModalTypesOpen(!isModalTypesOpen)}
				isOpen={isModalTypesOpen}
			/>
		</>
	)
}

export default Admin
