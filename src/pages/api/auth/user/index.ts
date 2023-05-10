import prisma from '@/prisma/client'
import { Prisma } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'

//?
const errorHandle = (data: any, res: any, code = 400) => {
	res.status(code).json({
		hasError: true,
		errorMessage: data
	})
}
//?
const responseHandler = (data: any, res: any, code = 200) => {
	res.status(code).json({
		hasError: false,
		body: data
	})
}
//?
const validateAllOne = (fields: any) => {
	for (const key in fields) {
		if (fields[key].trim() === '') {
			throw `${key} required`
		}
	}
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { name, email, password } = req.body
		try {
			validateAllOne(req.body)
			const data = await prisma.user.create({
				data: {
					name: name,
					email: email,
					password: await bcrypt.hash(password, 10)
				}
			})
			if (data) {
				responseHandler(data, res, 201)
			} else {
				errorHandle('Something went wrong', res)
			}
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					errorHandle('P2002', res)
				}
			}
			errorHandle(error, res)
		}
	}
}
