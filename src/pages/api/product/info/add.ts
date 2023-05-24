import prisma from '@/prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { productId, description, title } = req.body

		try {
			const data = await prisma.product_info.create({
				data: {
					productId,
					description,
					title
				}
			})
			return res.status(200).json(data)
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
