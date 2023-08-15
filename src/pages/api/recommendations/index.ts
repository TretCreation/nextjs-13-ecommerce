import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/prisma/client'

interface FormattedResult {
  count: number
  productId: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { productId } = req.query

    try {
      const result = await prisma.$queryRaw<FormattedResult[]>`
				SELECT
					COUNT(op.id) AS count,
					op.productId AS productId
				FROM
					Order_product op
					INNER JOIN \`Order\` o ON (o.id = op.orderId)
				WHERE
					op.orderId IN (
						SELECT
							orderId
						FROM
							Order_product
						WHERE
							Order_product.productId = ${productId}
					)
					AND op.productId != ${productId}
					AND o.status = 'COMPLETED'
				GROUP BY
					op.productId
				ORDER BY
					COUNT(op.id) DESC
				LIMIT 3;`

      if (!result.length) return res.status(200).json('empty recommendations')

      const formattedResult: FormattedResult[] = result.map(item => ({
        count: Number(item.count),
        productId: item.productId
      }))

      const recommendedProductIds = formattedResult.map(item => item.productId)
      console.log(recommendedProductIds)

      const data = await prisma.product.findMany({
        where: {
          id: { in: recommendedProductIds }
        }
      })

      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}
