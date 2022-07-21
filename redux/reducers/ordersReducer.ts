import { createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'react'
import { ordersService } from '../../services/orders'
import { openSnackBar } from './snackBarReducer'

//reducers
export const ordersSlice = createSlice({
	name: 'orders',
	initialState: {
		orders: []
	},
	reducers: {
		setOrders: (state, action) => {
			state.orders = action.payload === undefined ? 0 : action.payload.data
		},
	}
})

//actions
export const { setOrders } = ordersSlice.actions

export const getOrders = () => async (dispatch: Dispatch<any>) => {
	try {
		const orders = await ordersService.getOrders({})
		dispatch(setOrders(orders))
	} catch (error) {
		console.log("get orders error ? ", error)
	}
}


//selectors
export const selectOrders = (state: any) => state.ordersState.orders

export default ordersSlice.reducer