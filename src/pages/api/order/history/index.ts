import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const { userId } = req.query

			const data = await prisma.order.findMany({
				where: {
					userId: Number(userId)
				},
				include: {
					order_products: {
						select: {
							count: true,
							product: true
						}
					}
				}
			})
			return res.status(200).json(data)
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
