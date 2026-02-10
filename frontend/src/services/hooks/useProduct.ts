import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import productApi from "../api/productApi"
import { ProductQueryParams } from "@/types"
import { toast } from "sonner"
import { AxiosError } from "axios"

export const useProducts = (params?: ProductQueryParams) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => productApi.getAll(params),
  })
}

export const useProductDetail = (id: number) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => productApi.getDetail(id),
    enabled: !!id,
  })
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData: FormData) => productApi.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast.success("Produk berhasil ditambahkan")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Gagal menambahkan produk")
    },
  })
}

export const useUpdateProduct = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData: FormData) => productApi.update(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      queryClient.invalidateQueries({ queryKey: ["products", id] })
      toast.success("Produk berhasil diperbarui")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Gagal memperbarui produk")
    },
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => productApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast.success("Produk berhasil dihapus")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Gagal menghapus produk")
    },
  })
}
