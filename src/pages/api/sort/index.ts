import prisma from '@/prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		const { limit, q, r, p, brandId } = req.query

		const ITEMS_PER_PAGE = Number(limit)
		const page = Number(req.query.page)
		const skip = (page - 1) * ITEMS_PER_PAGE

		if (brandId !== undefined) {
			try {
				const data = await prisma.product.findMany({
					where: {
						typeId: Number(q),
						brandId: Number(brandId)
					},
					orderBy: {
						rating: r,
						price: p
					} as any,
					skip: skip,
					take: ITEMS_PER_PAGE
				})

				return res.status(200).json(data)
			} catch (error) {
				return res.status(500).json(error)
			}
		}
		try {
			const data = await prisma.product.findMany({
				where: {
					typeId: Number(q)
				},
				orderBy: {
					rating: r,
					price: p
				} as any,
				skip: skip,
				take: ITEMS_PER_PAGE
			})

			return res.status(200).json(data)
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
