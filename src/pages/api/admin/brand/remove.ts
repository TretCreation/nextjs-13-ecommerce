import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const { brand } = req.body

			const brandID = await prisma.brand.findFirst({
				where: { name: brand }
			})

			if (brandID === null) {
				return res.status(404).json({ error: 'Brand not found' })
			}

			await prisma.wishlist.deleteMany({
				where: {
					product: {
						typeId: brandID.id
					}
				}
			})

			await prisma.cart.deleteMany({
				where: {
					product: {
						typeId: brandID.id
					}
				}
			})

			await prisma.order_product.deleteMany({
				where: {
					product: {
						typeId: brandID.id
					}
				}
			})

			await prisma.product.deleteMany({
				where: {
					typeId: brandID.id
				}
			})

			const data = await prisma.brand.deleteMany({
				where: {
					name: brand
				}
			})
			return res.status(200).json(data)
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
