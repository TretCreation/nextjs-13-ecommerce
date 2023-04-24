import { CategorySmartphones } from '@/src/components'
import { IProduct } from '@/src/interfaces/product.interface'
import { CategoryService } from '@/src/services/CategoryService'
import { GetStaticProps, NextPage } from 'next'

// interface ICategorySmartphonesProps {}

const CategorySmartphonesPage: NextPage<{ smartphones: IProduct[] }> = ({
	smartphones
}) => {
	return <CategorySmartphones smartphones={smartphones} />
}

export const getStaticProps: GetStaticProps<{
	smartphones: IProduct[]
}> = async () => {
	const smartphones = await CategoryService.getCategoryProduct('smartphones')

	return {
		props: {
			smartphones
		},
		revalidate: 10
	}
}

export default CategorySmartphonesPage
