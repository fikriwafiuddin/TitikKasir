import api from "@/lib/axios"
import {
  Category,
  CategoryQueryParams,
  PaginatedResponse,
  CategoriesData,
} from "@/types"
import { FormCreateCategory } from "@/types/form"

const getAll = async (
  params?: CategoryQueryParams,
): Promise<PaginatedResponse<CategoriesData>> => {
  const response = await api.get("/categories", { params })
  return response.data
}

const getDetail = async (id: number): Promise<Category> => {
  const response = await api.get(`/categories/${id}`)
  return response.data.data.category
}

const create = async (data: FormCreateCategory): Promise<Category> => {
  const response = await api.post("/categories", data)
  return response.data.data.category
}

const update = async (
  id: number,
  data: FormCreateCategory,
): Promise<Category> => {
  const response = await api.put(`/categories/${id}`, data)
  return response.data.data.category
}

const remove = async (id: number) => {
  const response = await api.delete(`/categories/${id}`)
  return response.data.data
}

const categoryApi = {
  getAll,
  getDetail,
  create,
  update,
  remove,
}

export default categoryApi
