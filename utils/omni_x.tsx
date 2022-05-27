// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}

const API_URL = 'https://omni-x-api.herokuapp.com/'

export function fetchCollection(chainId: any, address: string) {
  let collectionItems: any = []

  fetch(`${API_URL}/api/v1/collections`
  , { credentials: 'include', method: 'GET' }
  )
  .then(resp => resp.json())
  .then(itemArray => {
    itemArray.forEach((item: any) => collectionItems.push(item))
  })

  return collectionItems
}

