import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { type } = req.body

		try {
			const data = await prisma.type.create({
				data: {
					name: type
				}
			})
			return res.status(200).json(data)
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
