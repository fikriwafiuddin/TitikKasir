import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import categoryApi from "../api/categoryApi"
import { toast } from "sonner"
import { FormCreateCategory } from "@/types/form"
import { AxiosError } from "axios"

import { CategoryQueryParams } from "@/types"

export function useCategories(params?: CategoryQueryParams) {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => categoryApi.getAll(params),
  })
}

export function useCategory(id: number) {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => categoryApi.getDetail(id),
    enabled: !!id,
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: categoryApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast.success("Kategori berhasil ditambahkan!")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data?.message || "Gagal menambahkan kategori.",
      )
    },
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormCreateCategory }) =>
      categoryApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      queryClient.invalidateQueries({ queryKey: ["categories", id] })
      toast.success("Kategori berhasil diperbarui!")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data?.message || "Gagal memperbarui kategori.",
      )
    },
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: categoryApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast.success("Kategori berhasil dihapus!")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Gagal menghapus kategori.")
    },
  })
}
