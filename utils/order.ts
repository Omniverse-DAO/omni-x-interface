export interface IOrder {
  isOrderAsk: boolean
  signer: string
  collection: string
  price: number
  tokenId: number
  amount: number
  strategy: string
  currency: string
  nonce: number
  startTime: number
  endTime: number
  minPercentageToAsk: number
  signature: string
  srcChain: number
  destChain: number
}

export interface IOrderFilter {
  signer?: string
  collection?: string
  tokenId?: number
  amount?: number
  strategy?: string
  currency?: string
  nonce?: number
  startTime?: Date
  endTime?: Date
  chain?: number
  min?: number
  max?: number
}