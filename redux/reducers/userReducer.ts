import { createSlice } from '@reduxjs/toolkit'
import { Dispatch } from 'react'
import { userService } from '../../services/users'
import { openSnackBar } from './snackBarReducer'

//reducers
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        updatingUser: false,
        gettingUser: true,
        user: {}
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setUpdatingUser: (state, action) => {
            state.updatingUser = action.payload === undefined ? false : action.payload
        },
        setGettingUser: (state, action) => {
            state.gettingUser = action.payload === undefined ? false : action.payload
        }
    }
})

//actions
export const { setUser, setUpdatingUser, setGettingUser } = userSlice.actions

export const getUser = (address: string) => async (dispatch: Dispatch<any>) => {
    dispatch(setGettingUser(true))
    try {
        const user = await userService.getUserByAddress(address)
        dispatch(setUser(user))
        dispatch(setGettingUser(false))
    } catch (error) {
        dispatch(setUser({}))
        dispatch(setGettingUser(false))
    }
}

export const updateUser = (user: FormData) => async (dispatch: Dispatch<any>) => {
    dispatch(setUpdatingUser(true))

    try {
        await userService.updateProfile(user)
        dispatch(setUpdatingUser(false))
        dispatch(setUser(user))
        dispatch(openSnackBar({ message: 'Successfully updated', status: 'success' }))
    } catch (error: any) {
        dispatch(setUpdatingUser(false))
        dispatch(openSnackBar({ message: error.message, status: 'error' }))
    }
}

//selectors
export const selectUser = (state: any) => state.userState.user
export const selectUpdatingUser = (state: any) => state.userState.updatingUser
export const selectGettingUser = (state: any) => state.userState.gettingUser

export default userSlice.reducer