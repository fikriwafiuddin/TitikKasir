"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import categoryValidation from "@/validations/categoryValidation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Category } from "@/types"
import { FormCreateCategory } from "@/types/form"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"

interface CategoryFormProps {
  category?: Category
  onSuccess?: () => void
}

export function CategoryForm({ category, onSuccess }: CategoryFormProps) {
  const form = useForm({
    resolver: zodResolver(categoryValidation.create),
    defaultValues: {
      name: category?.name || "",
    },
  })

  const onSubmit = (data: FormCreateCategory) => {
    console.log(data)
    onSuccess?.()
  }

  return (
    <div className="border rounded-xl p-6">
      <form id="form-category" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-6">
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Nama Kategori</FieldLabel>
                  <Input
                    id="name"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    className="rounded-xl h-10"
                    placeholder="e.g. Minuman"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </div>
        <Button type="submit" className="w-full rounded-xl h-11">
          Simpan Kategori
        </Button>
      </form>
    </div>
  )
}
