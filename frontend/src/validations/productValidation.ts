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
    .max(25, "Nama maksimal 25 karakter"),
  price: z.preprocess(
    (val) => Number(val),
    z
      .number({
        error: (issue) =>
          issue.input == undefined
            ? "Harga harus diisi"
            : "Harga harus berupa angka",
      })
      .positive({ error: "Harga harus berupa angka positif" }),
  ),
  stock: z.preprocess(
    (val) => Number(val),
    z
      .number({
        error: (issue) =>
          issue.input == undefined
            ? "Stock harus diisi"
            : "Stock harus berupa angka",
      })
      .positive({ error: "Stock harus berupa angka positif" }),
  ),
  category: z
    .string({
      error: (issue) =>
        issue.input == undefined
          ? "Kategori harus diisi"
          : "Kategori harus berupa string",
    })
    .min(1, "Kategori harus diisi")
    .max(50, "Kategori terlalu panjang"),
  image: z
    .instanceof(File, { error: "Gambar harus diisi" })
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      error: "Ukuran gambar maksimal 2MB",
    })
    .refine(
      (file) =>
        ["image/jpg", "image/jpeg", "image/png", "image/webp"].includes(
          file.type,
        ),
      { error: "Hanya jpg, jpeg, png, webp images yang diizinkan" },
    ),
})

const update = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input == undefined
          ? "Nama harus diisi"
          : "Nama harus berupa string",
    })
    .trim()
    .min(3, "Nama harus minimal 3 karakter")
    .max(25, "Nama maksimal 25 karakter"),
  price: z.preprocess(
    (val) => Number(val),
    z
      .number({
        error: (issue) =>
          issue.input == undefined
            ? "Harga harus diisi"
            : "Harga harus berupa angka",
      })
      .positive({ error: "Harga harus berupa angka positif" }),
  ),
  stock: z.preprocess(
    (val) => Number(val),
    z
      .number({
        error: (issue) =>
          issue.input == undefined
            ? "Stock harus diisi"
            : "Stock harus berupa angka",
      })
      .positive({ error: "Stock harus berupa angka positif" }),
  ),
  category: z
    .string({
      error: (issue) =>
        issue.input == undefined
          ? "Kategori harus diisi"
          : "Kategori harus berupa string",
    })
    .min(1, "Kategori harus diisi")
    .max(50, "Kategori terlalu panjang"),
  image: z
    .instanceof(File, { error: "Gambar harus diisi" })
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      error: "Ukuran gambar maksimal 2MB",
    })
    .refine(
      (file) =>
        ["image/jpg", "image/jpeg", "image/png", "image/webp"].includes(
          file.type,
        ),
      { error: "Hanya jpg, jpeg, png, webp images yang diizinkan" },
    )
    .optional(),
})

const productValidation = {
  create,
  update,
}

export default productValidation
