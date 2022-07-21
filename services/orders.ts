import { MakerOrderWithSignature } from "../types"
import API from "./api"

const createOrder = async (data: MakerOrderWithSignature) => {
    const res = await API.post("orders", data)
    return res.data.data
}

export const orderService = {
    createOrder
}