import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import orderApi from "../api/orderApi"
import { OrderQueryParams, CreateOrderData } from "@/types"
import { toast } from "sonner"
import { AxiosError } from "axios"

export function useOrders(params?: OrderQueryParams) {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => orderApi.getAll(params),
  })
}

export function useCreateOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateOrderData) => orderApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] })
      queryClient.invalidateQueries({ queryKey: ["products"] }) // Products stock changed
      toast.success("Transaksi berhasil!")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Gagal membuat transaksi.")
    },
  })
}
export function useUpdateOrderStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: string }) =>
      orderApi.updateStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] })
      queryClient.invalidateQueries({ queryKey: ["products"] }) // Stock might change
      toast.success("Status pesanan diperbarui!")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data?.message || "Gagal memperbarui status pesanan.",
      )
    },
  })
}
