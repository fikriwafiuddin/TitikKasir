import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"

export function useLogout() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation<void, AuthError, void>({
    mutationFn: async () => {
      return await authApi.logout()
    },
    onSuccess: () => {
      queryClient.clear()
      toast.success("Logout berhasil!")
      router.push("/auth/login")
    },
    onError: (error) => {
      toast.error(error.message || "Logout gagal, silakan coba lagi.")
    },
  })
}

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = createClient()
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()
      if (error) throw error
      return user
    },
  })
}
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { AuthError, AuthResponse } from "@supabase/supabase-js"
import authApi from "../api/authApi"
import {
  FormForgotPassword,
  FormLogin,
  FormRegister,
  FormResetPassword,
} from "@/types/form"

export function useResetPassword() {
  return useMutation<void, AuthError, FormForgotPassword>({
    mutationFn: async (data) => {
      return await authApi.resetPasswordForEmail(data.email)
    },
    onSuccess: () => {
      toast.success("Link reset password telah dikirim ke email Anda.")
    },
    onError: (error) => {
      toast.error(error.message || "Gagal mengirim link reset password.")
    },
  })
}

export function useUpdatePassword() {
  const router = useRouter()

  return useMutation<void, AuthError, FormResetPassword>({
    mutationFn: async (data) => {
      return await authApi.updatePassword(data.password)
    },
    onSuccess: () => {
      toast.success("Password berhasil diubah, silakan login kembali.")
      router.push("/auth/login")
    },
    onError: (error) => {
      toast.error(error.message || "Gagal mengubah password.")
    },
  })
}

export function useLogin() {
  const router = useRouter()

  return useMutation<AuthResponse["data"], AuthError, FormLogin>({
    mutationFn: async (data) => {
      return await authApi.login(data)
    },
    onSuccess: () => {
      toast.success("Login berhasil!")
      router.push("/pos")
    },
    onError: (error) => {
      toast.error(error.message || "Login gagal, silakan coba lagi.")
    },
  })
}

export function useRegister() {
  const router = useRouter()

  return useMutation<AuthResponse["data"], AuthError, FormRegister>({
    mutationFn: async (data) => {
      return await authApi.register(data)
    },
    onSuccess: () => {
      toast.success(
        "Registrasi berhasil! Silakan cek email Anda untuk verifikasi.",
      )
      router.push("/auth/login")
    },
    onError: (error) => {
      toast.error(error.message || "Registrasi gagal, silakan coba lagi.")
    },
  })
}
