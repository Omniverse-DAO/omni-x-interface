import { IOrder, IOrderFilter } from "../utils/order"
import API from "./api"

const makeOrder = async (order: IOrder) => {
    const res = await API.post(`orders`, order)
    return res.data
}

const getOrders = async (filter: IOrderFilter) => {
    const res = await API.get(`orders`, {
        params: filter
    })
    return res.data
}

const changeOrderStatus = async (hash: string, status: string) => {
    const res = await API.post(`orders/changeOrderStatus`, {
        hash,
        status
    })
    return res.data
}

const getNonce = async () => {
    return 0
}

export const ordersService = {
    makeOrder,
    getOrders,
    changeOrderStatus,
    getNonce
}