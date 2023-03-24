import { PrismaClient } from '@prisma/client'

enum Brands {
	Apple = 1,
	Samsung = 2
}

enum Types {
	Smartphones = 1
}

const prisma = new PrismaClient()

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// //* Products
// async function main() {
// 	const product = await prisma.product.create({
// 		data: {
// 			name: 'IPhone 14 Pro Space Black',
// 			price: 999,
// 			img: '/assets/products/apple/iphone-14-pro/Apple-iPhone-14-Pro-Space-Black.png',
// 			rating: 4,
// 			brandId: Brands.Apple,
// 			typeId: Types.Smartphones
// 		}
// 	})
// 	console.log(product)
// }

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
// 			name: 'Smartphones'
// 		}
// 	})

// 	console.log(type)
// }

// //? Main
// main()
// 	.catch(err => console.error(err.message))
// 	.finally(async () => {
// 		await prisma.$disconnect()
// 	})
