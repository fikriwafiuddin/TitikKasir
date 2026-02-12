import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import userApi from "../api/userApi"
import { User } from "@/types"
import { FormSettings } from "@/types/form"
import { toast } from "sonner"
import { AxiosError } from "axios"

export function useGetUserData() {
  return useQuery<User>({
    queryKey: ["user-profile"],
    queryFn: async () => {
      return await userApi.getUserData()
    },
  })
}

export function useUpdateUserData() {
  const queryClient = useQueryClient()

  return useMutation<User, AxiosError<{ message: string }>, FormSettings>({
    mutationFn: async (data) => {
      return await userApi.updateShopName(data)
    },
    onSuccess: () => {
      toast.success("Pengaturan berhasil diubah")
      queryClient.invalidateQueries({ queryKey: ["user-profile"] })
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal mengubah pengaturan.")
    },
  })
}
