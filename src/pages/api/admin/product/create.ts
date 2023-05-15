import formidable from 'formidable'
import fs from 'fs/promises'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

export const config = {
	api: {
		bodyParser: false
	}
}

const readFile = (
	req: NextApiRequest,
	saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
	const options: formidable.Options = {}

	if (saveLocally) {
		options.uploadDir = path.join(process.cwd(), '/public/assets/products/upload')
		options.filename = (name, ext, path, form) => {
			return Date.now().toString() + '_' + path.originalFilename
		}
	}

	options.maxFileSize = 4000 * 1024 * 1024

	const form = formidable(options)
	return new Promise((resolve, reject) => {
		form.parse(req, (err, fields, files) => {
			if (err) reject(err)
			resolve({ fields, files })
		})
	})
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			await fs.readdir(
				path.join(process.cwd() + '/public/assets/products', '/upload')
			)
		} catch (error) {
			await fs.mkdir(
				path.join(process.cwd() + '/public/assets/products', '/upload')
			)
		}
		await readFile(req, true)
		res.json({ done: 'ok' })
		// const { formData } = req.body

		// const dataForm = Object.fromEntries(formData)

		// const DEFAULT_RATING = 0
		// console.log('2')

		// console.log(formData)
		// try {
		// 	const data = await prisma.product.create({
		// 		data: {
		// 			name: dataForm.name,
		// 			price: dataForm.price,
		// 			img: dataForm.img,
		// 			rating: DEFAULT_RATING,
		// 			brandId: dataForm.brandId,
		// 			typeId: dataForm.typeId
		// 		}
		// 	})
		// 	return res.status(200).json(data)
		// } catch (error) {
		// 	return res.status(500).json(error)
		// }
	}
}
