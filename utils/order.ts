import { ethers, BigNumberish, BytesLike, Signer } from 'ethers'
import { TypedDataUtils } from 'ethers-eip712'

export type IOrder = {
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
  params: BytesLike
  srcChain: number
  destChain: number
}

export type IOrderFilter = {
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

const MAKE_ORDER_SIGN_TYPES = {
  EIP712Domain: [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' }
  ],
  MakerOrder: [
    { name: 'isOrderAsk', type: 'bool' },
    { name: 'signer', type: 'address' },
    { name: 'collection', type: 'address' },
    { name: 'price', type: 'uint256' },
    { name: 'tokenId', type: 'uint256' },
    { name: 'amount', type: 'uint256' },
    { name: 'strategy', type: 'address' },
    { name: 'currency', type: 'address' },
    { name: 'nonce', type: 'uint256' },
    { name: 'startTime', type: 'uint256' },
    { name: 'endTime', type: 'uint256' },
    { name: 'minPercentageToAsk', type: 'uint256' },
    { name: 'params', type: 'bytes' }
  ]
}

const zeroPad = (value: any, length: number) => {
  return ethers.utils.arrayify(ethers.utils.hexZeroPad(ethers.utils.hexlify(value), length))
}

export const setParams = (order: IOrder, types: string[], values: any[]) => {
  order.params = ethers.utils.arrayify(
    ethers.utils.defaultAbiCoder.encode(types, values)
  )
}

export const encodeParams = (order: IOrder, chainId: number, buyer: string) => {
  if (order.isOrderAsk) {
    setParams(order, ['uint16', 'address'], [chainId, buyer])
  } else {
    // TODO!!! this should be checked again later
    setParams(order, ['uint16', 'address'], [chainId, buyer])
  }
}

export const signOrder = async (order: IOrder, signer: Signer) => {
  const typedData = {
    domain: {},
    types: MAKE_ORDER_SIGN_TYPES,
    primaryType: 'MakerOrder',
    message: order
  }

  const eip191Header = ethers.utils.arrayify('0x1901')
  const messageHash = TypedDataUtils.hashStruct(typedData, typedData.primaryType, typedData.message)
  const pack = ethers.utils.solidityPack(['bytes', 'bytes32'], [
    eip191Header,
    zeroPad(messageHash, 32)
  ])
  const digest = ethers.utils.keccak256(pack)
  order.signature = await signer.signMessage(ethers.utils.arrayify(digest))
  return order
}

export type ITakerOrder = {
  isOrderAsk: boolean
  taker: string
  price: number
  tokenId: number
  params: BytesLike
  minPercentageToAsk: number
}
