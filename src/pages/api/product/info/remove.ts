import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { productId } = req.body

		try {
			const data = await prisma.product_info.deleteMany({
				where: {
					productId
				}
			})
			return res.status(200).json(data)
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
