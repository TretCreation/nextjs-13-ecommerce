import { CategorySmartphones } from '@/src/components'
import { IProduct } from '@/src/interfaces/product.interface'
import { SortByService } from '@/src/services/SortByService'
import { GetStaticProps, NextPage } from 'next'

const CategorySmartphonesPage: NextPage<{ smartphones: IProduct[] }> = ({
	smartphones
}) => {
	return <CategorySmartphones smartphones={smartphones} />
}

export const getStaticProps: GetStaticProps<{
	smartphones: IProduct[]
}> = async () => {
	const smartphones = await SortByService.getSortedProducts(
		'r',
		'desc',
		1,
		16,
		1
	)

	return {
		props: {
			smartphones
		},
		revalidate: 10
	}
}

export default CategorySmartphonesPage
