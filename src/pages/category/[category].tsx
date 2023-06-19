import Category from '@/src/components/screens/category/Category'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const CategoryWatchesPage: NextPage = () => {
	const router = useRouter()
	const { category } = router.query

	return <Category category={String(category)} />
}

export default CategoryWatchesPage
