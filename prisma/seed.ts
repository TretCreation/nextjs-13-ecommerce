import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	console.log('Start seeding...')

	const admin = await prisma.user.upsert({
		where: { email: 'admin@test.com' },
		update: {},
		create: {
			email: 'admin@test.com',
			password: 'admin',
			role: 'ADMIN_ROLE',
			orders: {
				create: {
					status: 'Pending',
					transactionId: 'TRANS6546236326',
					paymentAmount: 999
				}
			}
		}
	})

	const user = await prisma.user.upsert({
		where: { email: 'user@test.com' },
		update: {},
		create: {
			email: 'user@test.com',
			password: 'user',
			role: 'USER_ROLE',
			orders: {
				create: {
					status: 'Refunded',
					transactionId: 'TRANS9985834905',
					paymentAmount: 499
				}
			}
		}
	})

	console.log(admin, user)
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
