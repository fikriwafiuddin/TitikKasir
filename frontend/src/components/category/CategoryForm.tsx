"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  categorySchema,
  CategoryFormValues,
} from "@/validations/categoryValidation"
import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CategoryFormProps {
  initialData?: any
  onSubmit: (data: CategoryFormValues) => void
  title: string
}

export function CategoryForm({
  initialData,
  onSubmit,
  title,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema) as any,
    defaultValues: initialData || {
      name: "",
    },
  })

  return (
    <DialogContent className="sm:max-w-[400px] rounded-2xl">
      <form onSubmit={handleSubmit(onSubmit as any)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-6">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              {...register("name")}
              className="rounded-xl h-10"
              placeholder="e.g. Minuman"
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full rounded-xl h-11">
            Save Category
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
