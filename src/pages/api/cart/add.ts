import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { productId, userId } = req.body

		try {
			const data = await prisma.cart.create({
				data: {
					productId,
					userId
				}
			})
			return res.status(200).json(data)
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
