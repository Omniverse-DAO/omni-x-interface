import { chain_list } from "../utils/utils"
import API from "./api"

const getCollectionNFTs = async (address: string, chain: string, cursor = null) => {
    const option = {
        address: address,
        chain: chain,
        cursor: cursor
    }
    const res = await API.post(`collections/nfts`, option)
    return res.data
}

const getCollectionInfo = async (address: string, chain: string) => {
    const res = await API.get(`collections/${chain}/${address}`)
    return res.data
}

const getNFTInfo = async (address: string, tokenId: string, chain: string) => {
    const res = await API.get(`collections/${chain}/${address}/${tokenId}`)
    return res.data
}

export const collectionsService = {
    getCollectionNFTs,
    getCollectionInfo,
    getNFTInfo
}