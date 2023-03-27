/* eslint-disable @typescript-eslint/no-namespace */
import { PrismaClient } from '@prisma/client'

declare global {
	namespace NodeJS {
		// eslint-disable-next-line @typescript-eslint/no-empty-interface
		interface Global {}
	}
}

interface CustomNodeJsGlobal extends NodeJS.Global {
	prisma: PrismaClient
}

declare const global: CustomNodeJsGlobal

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma
