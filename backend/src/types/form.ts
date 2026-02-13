import { z } from "zod"
import categoryValidation from "../validations/categoryValidation.js"

export type FormCreateCategory = z.infer<typeof categoryValidation.create>
