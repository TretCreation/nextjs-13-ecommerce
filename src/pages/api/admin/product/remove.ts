import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const { id } = req.body

			await prisma.wishlist.deleteMany({
				where: {
					productId: id
				}
			})

			await prisma.cart.deleteMany({
				where: {
					productId: id
				}
			})

			await prisma.order_product.deleteMany({
				where: {
					productId: id
				}
			})

			const data = await prisma.product.delete({
				where: {
					id: id
				}
			})

			return res.status(200).json(data)
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
