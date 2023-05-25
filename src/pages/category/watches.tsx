import { CategoryWatches } from '@/src/components'
import { IProduct } from '@/src/interfaces/product.interface'
import { SortByService } from '@/src/services/SortByService'
import { GetStaticProps, NextPage } from 'next'

const CategoryWatchesPage: NextPage<{ watches: IProduct[] }> = ({ watches }) => {
	return <CategoryWatches watches={watches} />
}

export const getStaticProps: GetStaticProps<{
	watches: IProduct[]
}> = async () => {
	const watches = await SortByService.getSortedProducts('r', 'desc', 3, 4, 1)

	return {
		props: {
			watches
		},
		revalidate: 10
	}
}

export default CategoryWatchesPage
