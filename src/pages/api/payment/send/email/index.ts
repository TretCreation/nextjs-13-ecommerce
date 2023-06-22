import type { NextApiRequest, NextApiResponse } from 'next'
import * as nodemailer from 'nodemailer'
import { ICartPayment } from './../../../../../interfaces/cart.interface'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { email, status, subtotal, cartProducts } = req.body

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
					<h1>Your order</h1>
					<h2>Status: ${status}</h2>
					<table style="width:75%; border:1px solid black;">
						<tr style="border:1px solid black;">
							<th style="border:1px solid black;">Name</th>
							<th style="border:1px solid black;">Count</th>
							<th style="border:1px solid black;">Price</th>
						</tr>
						${
							cartProducts && cartProducts.length > 0
								? cartProducts
										.map(
											(product: ICartPayment) =>
												`<tr style="border:1px solid black;">
									<td style="border:1px solid black;">${product.name}</td>
									<td style="text-align:center;border:1px solid black;">${product.count}</td>
									<td style="text-align:center;border:1px solid black;">$${product.price}</td>
								</tr>`
										)
										.join('')
								: '<tr><td colspan="3">No products in the cart</td></tr>'
						}
						</table>
						<h2>Amount of orders: $${subtotal}</h2>
				`
			})

			return res.status(200).json('email sent')
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
