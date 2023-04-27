import prisma from '@/prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const PER_PAGE = Number(req.query.limit)
	const currentPage = Number(req.query.page)

	if (req.method === 'GET') {
		try {
			const data = await prisma.product.findMany({
				skip: (currentPage - 1) * PER_PAGE,
				take: PER_PAGE
			})
			return res.status(200).json(data)
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
