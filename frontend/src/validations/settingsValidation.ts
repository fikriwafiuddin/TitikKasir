import { z } from "zod"

const settingsSchema = z.object({
  storeName: z
    .string({
      error: (issue) =>
        issue.input == undefined
          ? "Nama toko harus diisi"
          : "Nama toko harus berupa string",
    })
    .trim()
    .min(3, "Nama toko harus minimal 3 karakter")
    .max(50, "Nama toko maksimal 50 karakter"),
})

export default settingsSchema
