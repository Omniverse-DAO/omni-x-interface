import { createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'react'
import { ordersService } from '../../services/orders'
import { IOrder } from '../../utils/order'
import { openSnackBar } from './snackBarReducer'

//reducers
export const ordersSlice = createSlice({
	name: 'orders',
	initialState: {
		orders: []
	},
	reducers: {
		setOrders: (state, action) => {
			state.orders = action.payload === undefined ? [] : action.payload.data
		},
		addOrder: (state, action) => {
			if (action.payload) {
				(state.orders as any[]).push(action.payload.data)
			}
		},
	}
})

//actions
export const { setOrders, addOrder } = ordersSlice.actions

export const getOrders = () => async (dispatch: Dispatch<any>) => {
	try {
		const orders = await ordersService.getOrders({})
		dispatch(setOrders(orders))
	} catch (error) {
		console.log("get orders error ? ", error)
	}
}

export const makeOrder = (order: IOrder) => async (dispatch: Dispatch<any>) => {
	try {
		const newOrder = await ordersService.makeOrder(order)
		dispatch(addOrder(newOrder))
	} catch (error) {
		console.log("listing error ? ", error)
	}
}

//selectors
export const selectOrders = (state: any) => state.ordersState.orders

export default ordersSlice.reducer