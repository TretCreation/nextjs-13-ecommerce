import prisma from '@/prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	//?
	if (req.method === 'GET') {
		try {
			const data = await prisma.wishlist.findMany()
			return res.status(200).json(data)
		} catch (error) {
			return res.status(500).json(error)
		}
	}
	if (req.method === 'POST') {
		try {
			const { userId } = req.body

			const data = await prisma.wishlist.findMany({
				where: { userId },
				select: { product: true }
			})
			return res.status(200).json(data)
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
