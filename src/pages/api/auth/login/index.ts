import * as bcrypt from 'bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { email, password } = req.body
		try {
			const data = await prisma.user.findFirst({
				where: {
					email: email
				}
			})
			if (data && (await bcrypt.compare(password, data.password))) {
				return res.status(200).json(data)
			}
			return res.status(500).json(null)
		} catch (error) {
			console.log('error')
			return res.status(500).json(error)
		}
	}
}
