import { CategoryHeadphones } from '@/src/components'
import { IProduct } from '@/src/interfaces/product.interface'
import { SortByService } from '@/src/services/SortByService'
import { GetStaticProps, NextPage } from 'next'

const CategoryHeadphonesPage: NextPage<{ headphones: IProduct[] }> = ({ headphones }) => {
	return <CategoryHeadphones headphones={headphones} />
}

export const getStaticProps: GetStaticProps<{
	headphones: IProduct[]
}> = async () => {
	const headphones = await SortByService.getSortedProducts('r', 'desc', 1, 4, 1)

	return {
		props: {
			headphones
		},
		revalidate: 10
	}
}

export default CategoryHeadphonesPage
