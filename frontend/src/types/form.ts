import { z } from "zod"
import productValidation from "@/validations/productValidation"

export type FormCreateProduct = z.infer<typeof productValidation.create>
export type FormUpdateProduct = z.infer<typeof productValidation.update>
