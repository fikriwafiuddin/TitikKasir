import api from "@/lib/axios"
import {
  Product,
  ProductQueryParams,
  PaginatedResponse,
  ProductsData,
} from "@/types"

const getAll = async (
  params?: ProductQueryParams,
): Promise<PaginatedResponse<ProductsData>> => {
  const response = await api.get("/products", { params })
  return response.data
}

const getDetail = async (id: number): Promise<Product> => {
  const response = await api.get(`/products/${id}`)
  return response.data.data.product
}

const create = async (formData: FormData): Promise<Product> => {
  const response = await api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data.data.product
}

const update = async (id: number, formData: FormData): Promise<Product> => {
  const response = await api.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data.data.product
}

const remove = async (id: number) => {
  const response = await api.delete(`/products/${id}`)
  return response.data.data
}

const productApi = {
  getAll,
  getDetail,
  create,
  update,
  remove,
}

export default productApi
