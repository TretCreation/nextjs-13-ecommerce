import prisma from '@/prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
	// name: string
) {
	if (req.method === 'GET') {
		try {
			const data = await prisma.product.findMany({
				where: {
					name: {
						search: req.query.q as string
					}
				}
			})
			console.log('req.query.q ', req.query.q)
			return res.status(200).json(data)
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
