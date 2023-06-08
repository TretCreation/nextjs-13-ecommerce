import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { phone, transactionId, date } = req.body

		const URL = 'https://k3g66n.api.infobip.com/viber/1/message/text'

		const headers = {
			Authorization: process.env.AUTHORIZATION_VIBER as string
		}

		const data = {
			messages: [
				{
					from: 'DemoCompany',
					to: '380958646633',
					content: {
						text: 'Test Next.js API'
					}
				}
			]
		}

		try {
			const response = await fetch(URL, {
				method: 'POST',
				headers,
				body: JSON.stringify(data)
			})

			if (response.ok) {
				const responseData = await response.json()
				res.status(200).json(responseData)
			} else {
				res.status(response.status).json({ error: 'Request failed' })
			}
		} catch (error) {
			console.log(error)
			res.status(500).json({ error: 'Internal server error' })
		}
	}
}
