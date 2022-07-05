import OmnixBridge from '../constants/OmnixBridge.json'
import OmnixBridge1155 from '../constants/OmnixBridge1155.json'
import ChainIds from '../constants/chainIds.json'

const omnixBridge: any = OmnixBridge
const omnixBridge1155: any = OmnixBridge1155
const chainIds: any = ChainIds

const environments: any = {
  mainnet: ['ethereum', 'bsc', 'avalanche', 'polygon', 'arbitrum', 'optimism', 'fantom'],
  testnet: ['rinkeby', 'bsc-testnet', 'fuji', 'mumbai', 'arbitrum-rinkeby', 'optimism-kovan', 'fantom-testnet']
}

export const getChainId = (chainIndex: number): number => {
  const env = environments['testnet'][chainIndex]
  return chainIds[env]
}

export const getAddressByName = (name: string, chain: string) => {
  if (name === 'Omnix') {
    return omnixBridge[chain]
  } else if (name === 'Omnix1155') {
    return omnixBridge1155[chain]
  }
}
