import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const query = Number(req.query.id)

	if (req.method === 'GET') {
		try {
			const data = await prisma.product.findUnique({
				where: {
					id: query
				},
				include: {
					brand: true,
					type: true,
					product_info: true
				}
			})
			return res.status(200).json(data)
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
