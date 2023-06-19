import prisma from '@/prisma/client'
import formidable from 'formidable'
import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next/types'

export const config = {
	api: {
		bodyParser: false
	}
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const saveFile = async (file: any, fields: any) => {
		//* Image
		const data = fs.readFileSync(file.path)
		const productInfoArray = JSON.parse(fields.info)

		fs.writeFileSync(`./public/assets/products/${file.name}`, data)
		await fs.unlinkSync(file.path)

		//* Fields
		const product = await prisma.product.create({
			data: {
				name: fields.name,
				price: Number(fields.price),
				type: { connect: { id: Number(fields.typeId) } },
				brand: { connect: { id: Number(fields.brandId) } },
				img: `/assets/products/${file.name}`,
				rating: 0
			}
		})

		const productInfoData = productInfoArray.map((info: any) => ({
			productId: product.id,
			title: info.title,
			description: info.description
		}))

		await prisma.product_info.createMany({
			data: productInfoData
		})
	}

	if (req.method === 'POST') {
		try {
			const form = new formidable.IncomingForm()
			form.parse(req, async function (err, fields, files) {
				await saveFile(files.file, fields)
				return res.status(201).send('')
			})
		} catch (error) {
			return res.status(500).json(error)
		}
	}
}
