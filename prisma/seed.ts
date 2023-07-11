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
            emailGoogle: row.emailGoogle || null,
            img: row.img
          }
        })
      })
      .on('end', () => {
        console.log('CSV User file successfully processed.')
      })

    //* Product_info
    await prisma.product_info.deleteMany()
    console.log('Deleted Product_info')

    await prisma.$queryRaw`ALTER TABLE Product_info AUTO_INCREMENT = 1`
    console.log('Reset Product_info auto increment to 1')

    fs.createReadStream('prisma/seeds/product_info.csv')
      .pipe(csv())
      .on('data', async row => {
        await prisma.product_info.create({
          data: {
            id: Number(row.id),
            productId: Number(row.productId),
            title: String(row.title),
            description: String(row.description)
          }
        })
      })
      .on('end', () => {
        console.log('CSV Product_info file successfully processed.')
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

    //* Wishlist
    await prisma.wishlist.deleteMany()
    console.log('Deleted Wishlist')

    await prisma.$queryRaw`ALTER TABLE Wishlist AUTO_INCREMENT = 1`
    console.log('Reset Wishlist auto increment to 1')

    fs.createReadStream('prisma/seeds/wishlist.csv')
      .pipe(csv())
      .on('data', async row => {
        await prisma.wishlist.create({
          data: {
            id: Number(row.id),
            userId: Number(row.userId),
            productId: Number(row.productId)
          }
        })
      })
      .on('end', () => {
        console.log('CSV Wishlist file successfully processed.')
      })

    //* Cart
    await prisma.cart.deleteMany()
    console.log('Deleted Cart')

    await prisma.$queryRaw`ALTER TABLE Cart AUTO_INCREMENT = 1`
    console.log('Reset Cart auto increment to 1')

    fs.createReadStream('prisma/seeds/cart.csv')
      .pipe(csv())
      .on('data', async row => {
        await prisma.cart.create({
          data: {
            id: Number(row.id),
            userId: Number(row.userId),
            productId: Number(row.productId)
          }
        })
      })
      .on('end', () => {
        console.log('CSV Cart file successfully processed.')
      })

    //* Order_Product
    await prisma.order_product.deleteMany()
    console.log('Deleted Order_Product')

    await prisma.$queryRaw`ALTER TABLE Order_product AUTO_INCREMENT = 1`
    console.log('Reset Order_Product auto increment to 1')

    fs.createReadStream('prisma/seeds/order_product.csv')
      .pipe(csv())
      .on('data', async row => {
        await prisma.order_product.create({
          data: {
            id: Number(row.id),
            orderId: Number(row.orderId),
            productId: Number(row.productId),
            count: Number(row.count)
          }
        })
      })
      .on('end', () => {
        console.log('CSV Order_Product file successfully processed.')
      })

    //* Orders
    await prisma.order.deleteMany()
    console.log('Deleted Orders')

    await prisma.$queryRaw`ALTER TABLE \`Order\` AUTO_INCREMENT = 1`
    console.log('Reset Orders auto increment to 1')

    fs.createReadStream('prisma/seeds/orders.csv')
      .pipe(csv())
      .on('data', async row => {
        await prisma.order.create({
          data: {
            id: Number(row.id),
            userId: Number(row.userId),
            status: String(row.status),
            transactionId: String(row.transactionId),
            paymentAmount: Number(row.paymentAmount),
            createdAt: new Date(row.createdAt),
            updatedAt: new Date(row.updatedAt)
          }
        })
      })
      .on('end', () => {
        console.log('CSV Orders file successfully processed.')
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
