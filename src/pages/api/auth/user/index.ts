import prisma from '@/prisma/client'
import * as bcrypt from 'bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { name, email, password } = req.body
		try {
			const data = await prisma.user.create({
				data: {
					name: name,
					email: email,
					password: await bcrypt.hash(password, 10)
				}
			})
			return res.status(200).json(data)
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
