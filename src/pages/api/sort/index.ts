import prisma from '@/prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		try {
			const PER_PAGE = Number(req.query.limit)
			const currentPage = Number(req.query.page)
			const data = await prisma.product.findMany({
				where: {
					typeId: Number(req.query.q)
				},
				//?
				orderBy: {
					rating: req.query.r,
					price: req.query.p
				} as any,
				skip: (currentPage - 1) * PER_PAGE,
				take: PER_PAGE
			})
			console.log('per_page', PER_PAGE)
			console.log('currentPage', currentPage)
			return res.status(200).json(data)
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
