import { PrismaClient } from '@prisma/client'

enum Brands {
	Apple = 1,
	Samsung = 2
}

enum Types {
	Smartphones = 1,
	Laptops = 2
}

const prisma = new PrismaClient()

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//* Products
async function main() {
	const product = await prisma.product.create({
		data: {
			name: 'Samsung Galaxy S23 Pink',
			price: 799,
			img: '/assets/products/samsung/smartphones/galaxy-s23-plus/samsung-galaxy-s23-pink',
			rating: 3,
			brandId: Brands.Samsung,
			typeId: Types.Smartphones
		}
	})
	console.log(product)
}

// //*Brands
// async function main() {
// 	const brand = await prisma.brand.create({
// 		data: {
// 			name: 'Samsung'
// 		}
// 	})

// 	console.log(brand)
// }

// //*Types
// async function main() {
// 	const type = await prisma.type.create({
// 		data: {
// 			name: 'Laptops'
// 		}
// 	})

// 	console.log(type)
// }

// //* Main
main()
	.catch(err => console.error(err.message))
	.finally(async () => {
		await prisma.$disconnect()
	})
