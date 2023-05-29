import prisma from '@/prisma/client'
import { Prisma } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'

const errorHandle = (data: any, res: any, code = 400) => {
	res.status(code).json({
		hasError: true,
		errorMessage: data
	})
}

const responseHandler = (data: any, res: any, code = 200) => {
	res.status(code).json({
		hasError: false,
		body: data
	})
}

const validateAllOne = (fields: any) => {
	for (const key in fields) {
		if (fields[key] === null || fields[key] === undefined) {
			continue
		}
		if (fields[key].trim() === '') {
			throw `${key} required`
		}
	}
	return
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { name, email, emailGoogle, emailFacebook, password } = req.body
		try {
			validateAllOne(req.body)

			const data = await prisma.user.create({
				data: {
					name,
					email,
					emailGoogle,
					emailFacebook,
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
					errorHandle('Unique constraint failed on the {constraint}', res)
				}
			}
			errorHandle(error, res)
		}
	}

	if (req.method === 'GET') {
		try {
			const { email, google, facebook } = req.query

			const data = await prisma.user.findUnique({
				where: {
					email: email as string,
					emailGoogle: google as string,
					emailFacebook: facebook as string
				}
			})
			return res.status(200).json(data)
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
