import {ethers} from 'ethers'
import {chains, getAddressByName, rpcProviders} from './constants'
import OmnixBridgeABI from '../constants/abis/OmnixBridge.json'
import OmnixBridge1155ABI from '../constants/abis/OmnixBridge1155.json'
import ERC721ABI from '../constants/abis/ERC721.json'
import ERC1155ABI from '../constants/abis/ERC1155.json'
import LZEndpointABI from '../constants/abis/LayerzeroEndpoint.json'

export const getOmnixBridgeInstance = (chainId: number, signer: any) => {
  const address = getAddressByName('Omnix', chainId)
  if (signer === null) {
    const rpcURL = rpcProviders[chainId]
    const _provider = new ethers.providers.JsonRpcProvider(
      rpcURL,
      {
        name: chains[chainId],
        chainId: chainId,
      }
    )
    return new ethers.Contract(
      address,
      OmnixBridgeABI,
      _provider
    )
  }
  return new ethers.Contract(
    address,
    OmnixBridgeABI,
    signer
  )
}

export const getOmnixBridge1155Instance = (chainId: number, signer: any) => {
  const address = getAddressByName('Omnix1155', chainId)
  if (signer === null) {
    const rpcURL = rpcProviders[chainId]
    const _provider = new ethers.providers.JsonRpcProvider(
      rpcURL,
      {
        name: chains[chainId],
        chainId: chainId,
      }
    )
    return new ethers.Contract(
      address,
      OmnixBridge1155ABI,
      _provider
    )
  }
  return new ethers.Contract(
    address,
    OmnixBridge1155ABI,
    signer
  )
}

export const getERC721Instance = (contractAddress: string, signer: any) => {
  return new ethers.Contract(
    contractAddress,
    ERC721ABI,
    signer
  )
}

export const getERC1155Instance = (contractAddress: string, signer: any) => {
  return new ethers.Contract(
    contractAddress,
    ERC1155ABI,
    signer
  )
}

export const getLayerZeroEndpointInstance = (chainId: number, provider: any) => {
  const address = getAddressByName('LayerZeroEndpoint', chainId)
  return new ethers.Contract(
    address,
    LZEndpointABI,
    provider
  )
}
