import api from "@/lib/axios"
import {
  OrderQueryParams,
  PaginatedResponse,
  OrderWithItems,
  OrdersData,
  CreateOrderData,
} from "@/types"

const create = async (data: CreateOrderData): Promise<OrderWithItems> => {
  const response = await api.post("/orders", data)
  return response.data.data.order
}

const getAll = async (
  params?: OrderQueryParams,
): Promise<PaginatedResponse<OrdersData>> => {
  const response = await api.get("/orders", { params })
  return response.data
}

const updateStatus = async (
  orderId: string,
  status: string,
): Promise<OrderWithItems> => {
  const response = await api.patch(`/orders/${orderId}/status`, { status })
  return response.data.data.order
}

const orderApi = {
  create,
  getAll,
  updateStatus,
}

export default orderApi
