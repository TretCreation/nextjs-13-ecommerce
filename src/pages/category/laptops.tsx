import { CategoryLaptops } from '@/src/components'
import { IProduct } from '@/src/interfaces/product.interface'
import { SortByService } from '@/src/services/SortByService'
import { GetStaticProps, NextPage } from 'next'

const CategoryLaptopsPage: NextPage<{ laptops: IProduct[] }> = ({ laptops }) => {
	return <CategoryLaptops laptops={laptops} />
}

export const getStaticProps: GetStaticProps<{
	laptops: IProduct[]
}> = async () => {
	const laptops = await SortByService.getSortedProducts('r', 'desc', 2, 16, 1)

	return {
		props: {
			laptops
		},
		revalidate: 10
	}
}

export default CategoryLaptopsPage
