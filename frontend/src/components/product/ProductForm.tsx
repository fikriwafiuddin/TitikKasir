"use client"

import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import productValidation from "@/validations/productValidation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Product } from "@/types"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { FileUpload } from "../FileUploade"
import { useCategories } from "@/services/hooks/useCategory"
import { useCreateProduct, useUpdateProduct } from "@/services/hooks/useProduct"
import { FormCreateProduct, FormUpdateProduct } from "@/types/form"
import { Spinner } from "../ui/spinner"

interface ProductFormProps {
  product?: Product
  onSuccess?: () => void
  mode?: "create" | "edit"
}

export function ProductForm({
  product,
  onSuccess,
  mode = "create",
}: ProductFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    product?.image || null,
  )

  const { data: categoriesData } = useCategories({ limit: 100 })
  const categories = categoriesData?.data?.categories || []

  const createMutation = useCreateProduct()
  const updateMutation = useUpdateProduct(product?.id || 0)

  const form = useForm({
    resolver: zodResolver(
      mode === "create" ? productValidation.create : productValidation.update,
    ),
    defaultValues: {
      name: product?.name || "",
      price: product?.price || 0,
      stock: product?.stock || 0,
      category_id: product?.category_id || undefined,
      image: undefined,
    },
  })

  const onSubmit = async (data: FormCreateProduct | FormUpdateProduct) => {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("price", data.price.toString())
    formData.append("stock", data.stock.toString())
    formData.append("category_id", data.category_id.toString())

    if (data.image) {
      formData.append("image", data.image)
    }

    if (mode === "create") {
      createMutation.mutate(formData, {
        onSuccess: () => onSuccess?.(),
      })
    } else {
      updateMutation.mutate(formData, {
        onSuccess: () => onSuccess?.(),
      })
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending

  return (
    <div className="border rounded-xl p-6">
      <form id="form-product" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-6">
          <FieldGroup>
            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Gambar Produk</FieldLabel>
                  <FileUpload
                    onFileSelect={(file) => {
                      field.onChange(file)
                      setPreviewUrl(URL.createObjectURL(file))
                    }}
                    previewUrl={previewUrl}
                    acceptedFileTypes="image/png, image/jpeg, image/webp"
                    fileRestrictionsText="PNG, JPEG, atau WEBP. Maks 2MB"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Nama Produk</FieldLabel>
                  <Input
                    id="name"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    className="rounded-xl h-10"
                    placeholder="e.g. Kopi Susu"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup>
            <Controller
              name="category_id"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="category_id">Kategori</FieldLabel>
                  <Select
                    onValueChange={(val) => field.onChange(parseInt(val))}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger
                      id="category_id"
                      aria-invalid={fieldState.invalid}
                      className="w-full rounded-xl h-10"
                    >
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <div className="grid grid-cols-2 gap-4">
            <FieldGroup>
              <Controller
                name="price"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Harga (Rp)</FieldLabel>
                    <Input
                      id="price"
                      type="number"
                      {...field}
                      value={
                        field.value === undefined || field.value === null
                          ? ""
                          : String(field.value)
                      }
                      aria-invalid={fieldState.invalid}
                      className="rounded-xl h-10"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <FieldGroup>
              <Controller
                name="stock"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Stock</FieldLabel>
                    <Input
                      id="stock"
                      type="number"
                      {...field}
                      value={
                        field.value === undefined || field.value === null
                          ? ""
                          : String(field.value)
                      }
                      aria-invalid={fieldState.invalid}
                      className="rounded-xl h-10"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full rounded-xl h-11"
          disabled={isPending}
        >
          {isPending ? <Spinner /> : "Simpan Produk"}
        </Button>
      </form>
    </div>
  )
}
