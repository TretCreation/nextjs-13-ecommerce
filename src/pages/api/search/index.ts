import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const data = await prisma.product.findMany({
				where: {
					OR: [
						{
							name: {
								contains: req.query.q as string
							}
						},
						{
							brand: {
								name: {
									contains: req.query.q as string
								}
							}
						},
						{
							type: {
								name: {
									contains: req.query.q as string
								}
							}
						}
					]
				}
			})
			return res.status(200).json(data)
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
