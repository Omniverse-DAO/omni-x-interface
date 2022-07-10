import { createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'react'
import { collectionsService } from '../../services/collections'
import { openSnackBar } from './snackBarReducer'

//reducers
export const collectionsSlice = createSlice({
	name: 'collections',
	initialState: {
		nfts: [],
		nftCursor: null,
		info: {},
		nftInfo: {}
	},
	reducers: {
		setCollectionNFTs: (state, action) => {
			state.nfts = (action.payload === undefined || action.payload.data === undefined) ? state.nfts : state.nfts.concat(action.payload.data)
			state.nftCursor = (action.payload === undefined || action.payload.cursor === undefined) ? state.nftCursor : action.payload.cursor
		},
		setCollectionInfo: (state, action) => {
			state.info = action.payload === undefined ? {} : action.payload.data
		},
		setNFTInfo: (state, action) => {
			state.nftInfo = action.payload === undefined ? {} : action.payload.data
		},
		clearCollections: (state) => {
			state.nfts = []
			state.nftCursor = null
		}
	}
})

//actions
export const { setCollectionNFTs, setCollectionInfo, setNFTInfo, clearCollections } = collectionsSlice.actions

export const clearCollectionNFTs = () => (dispatch: Dispatch<any>) => {
	dispatch(clearCollections());
}

export const getCollectionNFTs = (address: string, chain: string, cursor = null) => async (dispatch: Dispatch<any>) => {
	try {
		const nfts = await collectionsService.getCollectionNFTs(address, chain, cursor)
		dispatch(setCollectionNFTs(nfts))
	} catch (error) {
		console.log("getCollectionNFTs error ? ", error)
	}
}
export const getCollectionInfo = (address: string, chain: string) => async (dispatch: Dispatch<any>) => {
	try {
		const info = await collectionsService.getCollectionInfo(address, chain)
		dispatch(setCollectionInfo(info))
	} catch (error) {
		console.log("getCollectionInfo error ? ", error)
	}
}

export const getNFTInfo = (address: string, tokenId: string, chain: string) => async (dispatch: Dispatch<any>) => {
	try {
		const info = await collectionsService.getNFTInfo(address, tokenId, chain)
		dispatch(setNFTInfo(info))
	} catch (error) {
		console.log("getNFTInfo error ? ", error)
	}
}


//selectors
export const selectCollectionNFTs = (state: any) => {
	return {
		list: state.collectionsState.nfts,
		cursor: state.collectionsState.nftCursor        
	}
}
export const selectCollectionInfo = (state: any) => state.collectionsState.info
export const selectNFTInfo = (state: any) => state.collectionsState.nftInfo

export default collectionsSlice.reducer