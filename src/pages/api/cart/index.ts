import prisma from '@/prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const data = await prisma.cart.findMany()
			return res.status(200).json(data)
		} catch (error) {
			return res.status(500).json(error)
		}
	}
	if (req.method === 'POST') {
		try {
			const { userId } = req.body

			const data = await prisma.cart.findMany({
				where: { userId },
				select: {
					product: true
				}
			})

			const productsWithCount = await Promise.all(
				data.map(async item => {
					const count = await prisma.cart.findMany({
						where: {
							userId,
							productId: item.product.id
						},
						select: {
							count: true
						}
					})
					return {
						...item.product,
						count: count[0].count
					}
				})
			)

			return res.status(200).json(productsWithCount)
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
