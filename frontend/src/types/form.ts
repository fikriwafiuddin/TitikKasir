import { z } from "zod"
import productValidation from "@/validations/productValidation"
import categoryValidation from "@/validations/categoryValidation"
import authValidation from "@/validations/authValidation"

export type FormCreateProduct = z.infer<typeof productValidation.create>
export type FormUpdateProduct = z.infer<typeof productValidation.update>

export type FormCreateCategory = z.infer<typeof categoryValidation.create>

export type FormLogin = z.infer<typeof authValidation.login>
export type FormRegister = z.infer<typeof authValidation.register>
