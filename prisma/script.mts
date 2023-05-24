import { PrismaClient } from '@prisma/client'

enum Brands {
	Apple = 1,
	Samsung = 2,
	Lenovo = 3,
	Asus = 4
}

enum Types {
	Smartphones = 1,
	Laptops = 2,
	Watches = 3,
	Headphones = 4
}

const prisma = new PrismaClient()

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//* Products
async function main() {
	const product = await prisma.product.create({
		data: {
			name: 'Watch Ultra Yellow',
			price: 799,
			img: '/assets/products/apple/headphones/apple-watch-ultra/apple-watch-ultra-yellow.png',
			rating: 4,
			brandId: Brands.Apple,
			typeId: Types.Watches
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
