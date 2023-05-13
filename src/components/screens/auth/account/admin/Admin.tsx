import Button from '@/src/components/ui/button/Button'
import { useState } from 'react'
import styles from './Admin.module.scss'
import ModalBrands from './modals/ModalBrands'
import ModalProducts from './modals/ModalProducts'
import ModalTypes from './modals/ModalTypes'

const Admin = () => {
	const [isModalProductsOpen, setIsModalProductsOpen] = useState<boolean>(false)
	const [isModalTypesOpen, setIsModalTypesOpen] = useState<boolean>(false)
	const [isModalBrandsOpen, setIsModalBrandsOpen] = useState<boolean>(false)

	return (
		<>
			<div className={styles.wrapper}>
				<Button
					appearance='primary'
					className={styles.btn}
					onClick={() => setIsModalProductsOpen(!isModalProductsOpen)}
				>
					Add / Remove a Product
				</Button>
				<Button
					appearance='primary'
					className={styles.btn}
					onClick={() => setIsModalTypesOpen(!isModalTypesOpen)}
				>
					Add / Remove a Type
				</Button>
				<Button
					appearance='primary'
					className={styles.btn}
					onClick={() => setIsModalBrandsOpen(!isModalBrandsOpen)}
				>
					Add / Remove a Brand
				</Button>
			</div>
			<ModalProducts
				handleClose={() => setIsModalProductsOpen(!isModalProductsOpen)}
				isOpen={isModalProductsOpen}
			/>
			<ModalTypes
				handleClose={() => setIsModalTypesOpen(!isModalTypesOpen)}
				isOpen={isModalTypesOpen}
			/>
			<ModalBrands
				handleClose={() => setIsModalBrandsOpen(!isModalBrandsOpen)}
				isOpen={isModalBrandsOpen}
			/>
		</>
	)
}

export default Admin
