import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { userId, status, transactionId, paymentAmount, createdAt, updatedAt } = req.body

		try {
			const data = await prisma.order.create({
				data: {
					userId,
					status,
					transactionId,
					paymentAmount: paymentAmount,
					createdAt,
					updatedAt
				}
			})
			return res.status(200).json(data.id)
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
