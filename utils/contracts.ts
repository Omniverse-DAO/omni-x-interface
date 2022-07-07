import {ethers} from 'ethers'
import {chains, getAddressByName, rpcProviders} from './constants'
import OmnixBridgeABI from '../constants/abis/OmnixBridge.json'
import ERC721ABI from '../constants/abis/ERC721.json'
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

export const getNFTInstance = (contractAddress: string, signer: any) => {
  return new ethers.Contract(
    contractAddress,
    ERC721ABI,
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
