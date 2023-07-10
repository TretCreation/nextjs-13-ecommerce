import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Category from '@/src/components/screens/category/Category'

const CategoryWatchesPage: NextPage = () => {
	const router = useRouter()
	const { category } = router.query

	return <Category category={String(category)} />
}

export default CategoryWatchesPage
