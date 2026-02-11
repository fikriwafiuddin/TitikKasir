import api from "@/lib/axios"
import { User } from "@/types"
import { FormSettings } from "@/types/form"

const getUserData = async (): Promise<User> => {
  const response = await api.get("/users/me")
  return response.data.data.user
}

const updateShopName = async (data: FormSettings): Promise<User> => {
  const response = await api.patch("/users/shop-name", data)
  return response.data.data.user
}

const userApi = {
  getUserData,
  updateShopName,
}

export default userApi
