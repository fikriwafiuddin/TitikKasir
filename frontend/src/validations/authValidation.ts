import { z } from "zod"

const login = z.object({
  email: z.string().email("Email tidak valid").min(1, "Email harus diisi"),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .min(1, "Password harus diisi"),
})

const register = z
  .object({
    first_name: z.string().min(1, "Nama depan harus diisi"),
    last_name: z.string().min(1, "Nama belakang harus diisi"),
    email: z.string().email("Email tidak valid").min(1, "Email harus diisi"),
    password: z
      .string()
      .min(6, "Password minimal 6 karakter")
      .min(1, "Password harus diisi"),
    confirm_password: z.string().min(1, "Konfirmasi password harus diisi"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password tidak cocok",
    path: ["confirm_password"],
  })

const forgotPassword = z.object({
  email: z.string().email("Email tidak valid").min(1, "Email harus diisi"),
})

const resetPassword = z
  .object({
    password: z
      .string()
      .min(6, "Password minimal 6 karakter")
      .min(1, "Password harus diisi"),
    confirm_password: z.string().min(1, "Konfirmasi password harus diisi"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password tidak cocok",
    path: ["confirm_password"],
  })

const authValidation = {
  login,
  register,
  forgotPassword,
  resetPassword,
}

export default authValidation
