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
			name: 'MacBook Air M2 Starlight',
			price: 1199,
			img: '/assets/products/apple/laptops/Apple-MacBook-Air-M2-Starlight.png',
			rating: 5,
			brandId: Brands.Apple,
			typeId: Types.Laptops
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

//? Main
main()
	.catch(err => console.error(err.message))
	.finally(async () => {
		await prisma.$disconnect()
	})
