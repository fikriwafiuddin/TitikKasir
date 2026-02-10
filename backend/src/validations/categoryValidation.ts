import { z } from "zod"

const create = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input == undefined ? "Name is required" : "Name must be a string",
    })
    .min(3, "Name must be at least 3 characters long")
    .max(25, "Name must be at most 25 characters long"),
})

const id = z.object({
  id: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().positive()),
})

const query = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  name: z.string().optional(),
})

const categoryValidation = {
  create,
  update: create,
  id,
  query,
}

export default categoryValidation
