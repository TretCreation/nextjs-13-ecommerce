import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma/client'

type Data = {
	name: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if ((req.method = 'GET')) {
		try {
			const data = await prisma.product.findMany()
			return res.status(200).json(data)
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
