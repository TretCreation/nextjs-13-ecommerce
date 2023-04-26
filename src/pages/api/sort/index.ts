import prisma from '@/prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		try {
			const data = await prisma.product.findMany({
				//?
				where: {
					typeId: Number(req.query.q)
				},
				orderBy: {
					rating: req.query.r,
					price: req.query.p
				} as any
			})
			return res.status(200).json(data)
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
