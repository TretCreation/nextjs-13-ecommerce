import type { NextApiRequest, NextApiResponse } from 'next'
import * as nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { email, phone, status, subtotal } = req.body

		try {
			const transporter = nodemailer.createTransport({
				service: 'gmail',
				port: 465,
				secure: true,
				logger: true,
				debug: true,
				auth: {
					user: process.env.NODEMAILER_USER,
					pass: process.env.NODEMAILER_PASS
				},
				tls: {
					rejectUnauthorized: true
				}
			}) as nodemailer.Transporter

			await transporter.sendMail({
				from: 'Tret Store <tret.store@gmail.com>',
				to: email,
				subject: 'Your order',
				html: `
					<h1>Hello World</h1>
					<p>Status: ${status}</p>
					<p>Amount of orders: ${subtotal}</p>
				`
			})

			return res.status(200).json('email sent')
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
