import { z } from "zod"

const settingsSchema = z.object({
  shop_name: z
    .string({
      error: (issue) =>
        issue.input == undefined
          ? "Nama toko harus diisi"
          : "Nama toko harus berupa string",
    })
    .trim()
    .min(3, "Nama toko harus minimal 3 karakter")
    .max(25, "Nama toko maksimal 25 karakter"),
})

export default settingsSchema
