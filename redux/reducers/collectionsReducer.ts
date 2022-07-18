import { createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'react'
import { collectionsService } from '../../services/collections'
import { openSnackBar } from './snackBarReducer'

//reducers
export const collectionsSlice = createSlice({
	name: 'collections',
	initialState: {
		nfts: [],
		info: {},
		nftInfo: {},
		finishedGetting: false,
		owners: 0,
		collections: [],
	},
	reducers: {
		setCollectionNFTs: (state, action) => {
			state.nfts = (action.payload === undefined || action.payload.data === undefined) ? state.nfts : state.nfts.concat(action.payload.data)
			state.finishedGetting = (action.payload === undefined || action.payload.finished === undefined) ? true : action.payload.finished
		},
		startGetNFTs: (state) => {
			state.finishedGetting = false
		},
		setCollectionInfo: (state, action) => {
			state.info = action.payload === undefined ? {} : action.payload.data
		},
		setNFTInfo: (state, action) => {
			state.nftInfo = action.payload === undefined ? {} : action.payload.data
		},
		clearCollections: (state) => {
			state.nfts = []
		},
		setCollectionOwners: (state, action) => {
			state.owners = action.payload === undefined ? 0 : action.payload.data
		},
		setCollections: (state, action) => {
			state.collections = action.payload === undefined ? 0 : action.payload.data
		},
	}
})

//actions
export const { setCollectionNFTs, setCollectionInfo, setNFTInfo, clearCollections, startGetNFTs, setCollectionOwners, setCollections } = collectionsSlice.actions

export const clearCollectionNFTs = () => (dispatch: Dispatch<any>) => {
	dispatch(clearCollections())
}

export const getCollectionNFTs = (col_url: string, page: Number, display_per_page: Number, sort: String, searchObj: Object) => async (dispatch: Dispatch<any>) => {
	dispatch(startGetNFTs())
	try {
		const nfts = await collectionsService.getCollectionNFTs(col_url, page, display_per_page, sort, searchObj)
		dispatch(setCollectionNFTs(nfts))
	} catch (error) {
		console.log("getCollectionNFTs error ? ", error)
	}
}

export const getCollectionInfo = (col_url: string) => async (dispatch: Dispatch<any>) => {
	try {
		const info = await collectionsService.getCollectionInfo(col_url)
		dispatch(setCollectionInfo(info))
	} catch (error) {
		console.log("getCollectionInfo error ? ", error)
	}
}

export const getCollectionOwners = (col_url: string) => async (dispatch: Dispatch<any>) => {
	try {
		const info = await collectionsService.getCollectionOwners(col_url)
		dispatch(setCollectionOwners(info))
	} catch (error) {
		console.log("getCollectionInfo error ? ", error)
	}
}

export const getNFTInfo = (col_url: string, token_id: string) => async (dispatch: Dispatch<any>) => {
	try {
		const info = await collectionsService.getNFTInfo(col_url, token_id)
		dispatch(setNFTInfo(info))
	} catch (error) {
		console.log("getNFTInfo error ? ", error)
	}
}

export const getCollections = () => async (dispatch: Dispatch<any>) => {
	try {
		const info = await collectionsService.getCollections()
		dispatch(setCollections(info))
	} catch (error) {
		console.log("getNFTInfo error ? ", error)
	}
}


//selectors
export const selectCollectionNFTs = (state: any) => state.collectionsState.nfts
export const selectCollectionInfo = (state: any) => state.collectionsState.info
export const selectNFTInfo = (state: any) => state.collectionsState.nftInfo
export const selectGetNFTs = (state: any) => state.collectionsState.finishedGetting
export const selectCollectionOwners = (state: any) => state.collectionsState.owners
export const selectCollections = (state: any) => state.collectionsState.collections

export default collectionsSlice.reducer