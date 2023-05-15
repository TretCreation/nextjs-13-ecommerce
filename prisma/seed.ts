import { PrismaClient } from '@prisma/client'
import csv from 'csv-parser'
import fs from 'fs'

const prisma = new PrismaClient()

async function main() {
	try {
		//* Users
		await prisma.user.deleteMany()
		console.log('Deleted Users')

		await prisma.$queryRaw`ALTER TABLE User AUTO_INCREMENT = 1`
		console.log('Reset User auto increment to 1')

		fs.createReadStream('prisma/seeds/users.csv')
			.pipe(csv())
			.on('data', async row => {
				await prisma.user.create({
					data: {
						id: Number(row.id),
						name: String(row.name),
						password: String(row.password),
						role: row.role as any,
						email: String(row.email),
						emailFacebook: row.emailFacebook || null,
						emailGoogle: row.emailGoogle || null
					}
				})
			})
			.on('end', () => {
				console.log('CSV User file successfully processed.')
			})

		//* Brand
		await prisma.brand.deleteMany()
		console.log('Deleted Brands')

		await prisma.$queryRaw`ALTER TABLE Brand AUTO_INCREMENT = 1`
		console.log('Reset Brand auto increment to 1')

		fs.createReadStream('prisma/seeds/brands.csv')
			.pipe(csv())
			.on('data', async row => {
				await prisma.brand.create({
					data: {
						id: Number(row.id),
						name: String(row.name)
					}
				})
			})
			.on('end', () => {
				console.log('CSV Brand file successfully processed.')
			})

		//* Type
		await prisma.type.deleteMany()
		console.log('Deleted Type')

		await prisma.$queryRaw`ALTER TABLE Type AUTO_INCREMENT = 1`
		console.log('Reset Type auto increment to 1')

		fs.createReadStream('prisma/seeds/types.csv')
			.pipe(csv())
			.on('data', async row => {
				await prisma.type.create({
					data: {
						id: Number(row.id),
						name: String(row.name)
					}
				})
			})
			.on('end', () => {
				console.log('CSV Type file successfully processed.')
			})
		//* Products
		await prisma.product.deleteMany()
		console.log('Deleted Products')

		await prisma.$queryRaw`ALTER TABLE Product AUTO_INCREMENT = 1`
		console.log('Reset Product auto increment to 1')

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
				console.log('CSV Product file successfully processed.')
			})

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
