import { PrismaClient } from '@prisma/client'
import csv from 'csv-parser'
import fs from 'fs'

const prisma = new PrismaClient()

async function main() {
	try {
		await prisma.product.deleteMany()
		console.log('Deleted Products')

		await prisma.$queryRaw`ALTER TABLE Product AUTO_INCREMENT = 1`
		console.log('Reset product auto increment to 1')

		fs.createReadStream('prisma/seeds/products.csv')
			.pipe(csv())
			.on('data', async row => {
				await prisma.product.create({
					data: {
						id: Number(row.id),
						name: String(row.name),
						price: Number(row.price),
						rating: Number(row.rating),
						brandId: Number(row.brandId),
						typeId: Number(row.typeId),
						img: String(row.img)
					}
				})
			})
			.on('end', () => {
				console.log('CSV file successfully processed.')
				prisma.$disconnect()
			})

		await prisma.brand.deleteMany()
		console.log('Deleted Brands')

		await prisma.$queryRaw`ALTER TABLE Brand AUTO_INCREMENT = 1`
		console.log('Reset brand auto increment to 1')

		console.log('Data seeding complete')
	} catch (error) {
		console.log(error)
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
