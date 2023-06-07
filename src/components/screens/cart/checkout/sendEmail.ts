import * as nodemailer from 'nodemailer'
import 'setimmediate'

async function sendEmail(userEmail: string, status: string, subtotal: number) {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		port: 465,
		secure: true,
		logger: true,
		debug: true,
		auth: {
			user: '',
			pass: ''
			// user: process.env.NODEMAILER_USER,
			// pass: process.env.NODEMAILER_PASS
		},
		tls: {
			rejectUnauthorized: true
		}
	}) as nodemailer.Transporter

	const info = await transporter.sendMail({
		from: 'Tret Store <tret.store@gmail.com>',
		to: userEmail,
		subject: 'Your order',
		html: `
			<h1>Hello World</h1>
			<p>Status: ${status}</p>
			<p>Amount of orders: ${subtotal}</p>
		`
	})

	console.log('Message sent: ', info.messageId)
}

sendEmail('tret.creation@gmail.com', 'STATUS', 123).catch(e => console.log(e))
