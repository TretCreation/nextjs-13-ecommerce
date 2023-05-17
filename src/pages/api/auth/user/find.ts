import prisma from '@/prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const { email } = req.query

			const data = await prisma.user.findFirstOrThrow({
				where: {
					OR: [
						{ email: email as string },
						{ emailGoogle: email as string },
						{ emailFacebook: email as string }
					]
				}
			})
			return res.status(200).json(data)
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
