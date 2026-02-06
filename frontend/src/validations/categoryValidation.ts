import { z } from "zod"

const create = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input == undefined
          ? "Nama harus diisi"
          : "Nama harus berupa string",
    })
    .trim()
    .min(3, "Nama harus minimal 3 karakter")
    .max(50, "Nama maksimal 50 karakter"),
})

const categoryValidation = {
  create,
}

export default categoryValidation
