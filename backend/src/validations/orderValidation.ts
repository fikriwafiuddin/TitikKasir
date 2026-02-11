import { z } from "zod"

const create = z.object({
  total_amount: z.coerce.number().int().positive(),
  items: z
    .array(
      z.object({
        product_id: z.number().int().positive(),
        product_name: z.string(),
        unit_price: z.number().int().positive(),
        quantity: z.number().int().positive(),
        sub_total: z.number().int().positive(),
      }),
    )
    .min(1),
})

const query = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  status: z.enum(["SUCCESS", "CANCELLED"]).optional(),
  date: z.string().optional(),
  month: z.string().optional(),
  year: z.string().optional(),
})

const orderId = z.object({
  orderId: z.string(),
})

const updateStatus = z.object({
  status: z.enum(["SUCCESS", "CANCELLED"]),
})

const orderValidation = {
  create,
  query,
  orderId,
  updateStatus,
}

export default orderValidation
