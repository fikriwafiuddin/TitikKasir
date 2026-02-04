import { z } from "zod"

export const productSchema = z.object({
  sku: z.string().min(3, "SKU must be at least 3 characters"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  price: z.coerce.number().min(0, "Price must be at least 0"),
  stock: z.coerce.number().min(0, "Stock must be at least 0"),
  category: z.string().min(1, "Please select a category"),
  image: z.string().optional(),
})

export type ProductFormValues = z.infer<typeof productSchema>

const productValidation = {
  add: productSchema,
}

export default productValidation
