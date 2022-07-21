import {ethers} from 'ethers'
import OmnixBridge from '../constants/OmnixBridge.json'
import OmnixExchange from '../constants/OmnixExchange.json'
import OmnixBridge1155 from '../constants/OmnixBridge1155.json'
import Strategy from '../constants/Strategy.json'
import OFT from '../constants/OFT.json'
import LZEndpoint from '../constants/LayerzeroEndpoints.json'
import ChainIds from '../constants/chainIds.json'
import CHAINS from '../constants/chains.json'

const omnixBridge: any = OmnixBridge
const omnixExchange: any = OmnixExchange
const strategy: any = Strategy
const oft: any = OFT
const omnixBridge1155: any = OmnixBridge1155
const lzEndpoint: any = LZEndpoint
const chainIds: any = ChainIds

const environments: any = {
  mainnet: ['ethereum', 'bsc', 'avalanche', 'polygon', 'arbitrum', 'optimism', 'fantom'],
  testnet: ['rinkeby', 'bsc-testnet', 'fuji', 'mumbai', 'arbitrum-rinkeby', 'optimism-kovan', 'fantom-testnet']
}


export type ContractName = 'Omnix' | 'Omnix1155' | 'LayerZeroEndpoint' | 'OmnixExchange' | 'Strategy' | 'OFT'

export const rpcProviders: { [key: number]: string } = {
  4: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  43113: 'https://api.avax-test.network/ext/bc/C/rpc',
  80001: 'https://speedy-nodes-nyc.moralis.io/99e98b2333a911011f42606d/polygon/mumbai',
  421611: 'https://rinkeby.arbitrum.io/rpc',
  69: 'https://kovan.optimism.io',
  4002: 'https://rpc.testnet.fantom.network'
}

export const chainInfos: { [key: number]: { name: string; logo: string, officialName: string, currency: string } } = {
  4: {
    name: 'rinkeby',
    logo: '/svgs/ethereum.svg',
    officialName: 'Rinkeby',
    currency: 'ETH'
  },
  97: {
    name: 'bsc-testnet',
    logo: '/svgs/binance.svg',
    officialName: 'BSC',
    currency: 'BNB'
  },
  43113: {
    name: 'fuji',
    logo: '/svgs/avax.svg',
    officialName: 'Fuji',
    currency: 'AVAX'
  },
  80001: {
    name: 'mumbai',
    logo: '/svgs/polygon.svg',
    officialName: 'Mumbai',
    currency: 'MATIC'
  },
  421611: {
    name: 'arbitrum-rinkeby',
    logo: '/svgs/arbitrum.svg',
    officialName: 'Arbitrum',
    currency: 'ArbETH'
  },
  69: {
    name: 'optimism-kovan',
    logo: '/svgs/optimism.svg',
    officialName: 'Optimism',
    currency: 'ETH'
  },
  4002: {
    name: 'fantom-testnet',
    logo: '/svgs/fantom.svg',
    officialName: 'Fantom',
    currency: 'FTM'
  }
}

export const getLayerzeroChainId = (chainId: number): number => {
  return chainIds[chainInfos[chainId].name]
}

export const chain_list: {[key: string]: number} = {
  'eth': 1,
  'bsc': 56,
  'matic': 137,
  'avalanche': 43114,
  'fantom': 250,
  'optimism': 10,
  'arbitrum': 42161,
  'bsc testnet': 97,
  'rinkeby': 4,
  'mumbai': 80001,
  'avalanche testnet': 43113
}

export const getChainIdFromName = (name: string): number => {
  return chain_list[name]
}

export const getAddressByName = (name: ContractName , chainId: number) => {
  if (name === 'Omnix') {
    return omnixBridge[chainInfos[chainId].name]
  } else if (name === 'Omnix1155') {
    return omnixBridge1155[chainInfos[chainId].name]
  } else if (name === 'LayerZeroEndpoint') {
    return lzEndpoint[chainInfos[chainId].name]
  } else if (name === 'OmnixExchange') {
    return omnixExchange[chainInfos[chainId].name]
  } else if (name === 'Strategy') {
    return strategy[chainInfos[chainId].name]
  } else if (name === 'OFT') {
    return oft[chainInfos[chainId].name]
  }
}

export const getProvider = (chainId: number) => {
  const rpcURL = rpcProviders[chainId]
  return new ethers.providers.JsonRpcProvider(
    rpcURL,
    {
      name: chainInfos[chainId].name,
      chainId: chainId,
    }
  )
}

export const getChainInfo = (chainId: number) => {
  const filter = CHAINS.filter((item) => item.chainId === chainId)
  if (filter.length > 0) {
    return filter[0]
  }
  return null
}
