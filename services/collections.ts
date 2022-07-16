import { chain_list } from "../utils/utils"
import API from "./api"

const getCollectionNFTs = async (col_url: string, page: Number, display_per_page: Number, sort: String, searchObj: Object) => {
    const option = {
        col_url,
        page,
        display_per_page,
        sort,
        searchObj
    }
    const res = await API.post(`collections/nfts`, option)
    return res.data
}

const getCollectionInfo = async (col_url: string) => {
    const res = await API.get(`collections/${col_url}`)
    return res.data
}

const getCollectionOwners = async (col_url: string) => {
    const res = await API.post(`collections/${col_url}`)
    return res.data
}

const getNFTInfo = async (col_url: string, token_id: string) => {
    const res = await API.get(`collections/${col_url}/${token_id}`)
    return res.data
}

const getCollections = async () => {
    const res = await API.get(`collections/all`)
    return res.data
}


export const collectionsService = {
    getCollectionNFTs,
    getCollectionInfo,
    getCollectionOwners,
    getNFTInfo,
    getCollections,
}