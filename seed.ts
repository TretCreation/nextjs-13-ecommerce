import { PrismaClient } from '@prisma/client'
import { parse } from 'csv-parse'
import fs from 'fs'
import { join } from 'path'

const prisma = new PrismaClient()

async function main() {
	const productsSeedFile = join(process.cwd(), './prisma/seeds/products.csv')
	const usersSeedFile = join(process.cwd(), './seeds/users.csv')

	try {
		await prisma.product.deleteMany()
		console.log('Deleted Products')

		await prisma.$queryRaw`ALTER TABLE Product AUTO_INCREMENT = 1`
		console.log('reset product auto increment to 1')

		console.log('aaaaaaaa', productsSeedFile)

		const fileStream = fs.createReadStream(productsSeedFile)
		const parser = parse({
			delimiter: ',',
			columns: true, // Treats the first row as the header
			skip_empty_lines: true
		})

		parser.on('readable', async () => {
			let record
			while ((record = parser.read())) {
				// Insert each record into the Prisma database
				await prisma.product.create({
					data: record
				})
			}
		})

		parser.on('end', async () => {
			console.log('Data seeding complete')
			await prisma.$disconnect()
		})

		// Pipe the CSV file stream to the parser
		fileStream.pipe(parser)

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
