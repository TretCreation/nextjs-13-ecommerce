import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const { productId, userId, count } = req.body

			const data = await prisma.cart.updateMany({
				where: { productId, userId },
				data: { count }
			})

			return res.status(200).json(data)
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
