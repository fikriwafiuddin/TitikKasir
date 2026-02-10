import { z } from "zod"

const create = z.object({
  category_id: z.coerce.number().int().positive(),
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(25, "Name must be at most 25 characters long"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  price: z.coerce.number().int().positive("Price must be greater than zero"),
  image: z.any().optional(),
})

const update = create.partial()

const query = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  name: z.string().optional(),
  category_id: z.coerce.number().int().positive().optional(),
})

const id = z.object({
  id: z.coerce.number().int().positive(),
})

const productValidation = {
  create,
  update,
  query,
  id,
}

export default productValidation
