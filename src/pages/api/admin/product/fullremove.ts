import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const { id, productId } = req.body
			const data1 = await prisma.product.delete({
				where: {
					id: Number(id)
				},
				include: {
					product_info: true
				}
			})

			const data2 = await prisma.product_info.deleteMany({
				where: {
					productId
				}
			})
			return res.status(200).json(data1)
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
