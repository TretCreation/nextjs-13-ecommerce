import prisma from '@/prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const { type } = req.body

			const typeID = await prisma.type.findFirst({
				where: { name: type }
			})

			if (typeID === null) {
				return res.status(404).json({ error: 'Brand not found' })
			}

			await prisma.wishlist.deleteMany({
				where: {
					product: {
						typeId: typeID.id
					}
				}
			})

			await prisma.cart.deleteMany({
				where: {
					product: {
						typeId: typeID.id
					}
				}
			})

			await prisma.order_product.deleteMany({
				where: {
					product: {
						typeId: typeID.id
					}
				}
			})

			await prisma.product.deleteMany({
				where: {
					typeId: typeID.id
				}
			})

			const data = await prisma.type.deleteMany({
				where: {
					name: type
				}
			})
			return res.status(200).json(data)
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
