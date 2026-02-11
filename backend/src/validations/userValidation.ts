import { z } from "zod"

const updateShopName = z.object({
  shop_name: z
    .string({
      error: (issue) =>
        issue.input == undefined
          ? "Shop name is required"
          : "Shop name must be a string",
    })
    .min(3, "Shop name must be at least 3 characters long")
    .max(25, "Shop name must be at most 25 characters long"),
})

const userValidation = {
  updateShopName,
}

export default userValidation
