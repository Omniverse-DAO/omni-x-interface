import {ethers} from 'ethers'
import {getAddressByName} from './constants'
import OmnixBridgeABI from '../constants/abis/OmnixBridge.json'
import ERC721ABI from '../constants/abis/ERC721.json'

const chains: { [ key: number ]: string } = {
  4: 'rinkeby',
}

export const getOmnixBridgeInstance = (chainIndex: number, signer: any) => {
  const chain = chains[chainIndex]
  const address = getAddressByName('Omnix', chain)
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
