"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  productSchema,
  ProductFormValues,
} from "@/validations/productValidation"
import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ProductFormProps {
  initialData?: any
  onSubmit: (data: ProductFormValues) => void
  title: string
}

const CATEGORIES = ["Minuman", "Makanan", "Snack", "Peralatan"]

export function ProductForm({
  initialData,
  onSubmit,
  title,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: initialData || {
      sku: "",
      name: "",
      price: 0,
      stock: 0,
      category: "",
    },
  })

  const categoryValue = watch("category")

  return (
    <DialogContent className="sm:max-w-[425px] rounded-2xl">
      <form onSubmit={handleSubmit(onSubmit as any)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-6">
          <div className="space-y-2">
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              {...register("sku")}
              className="rounded-xl h-10"
              placeholder="e.g. BRG001"
            />
            {errors.sku && (
              <p className="text-xs text-destructive">{errors.sku.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              {...register("name")}
              className="rounded-xl h-10"
              placeholder="e.g. Kopi Susu"
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              onValueChange={(value) => setValue("category", value)}
              defaultValue={categoryValue}
            >
              <SelectTrigger className="w-full rounded-xl h-10">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-xs text-destructive">
                {errors.category.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (Rp)</Label>
              <Input
                id="price"
                type="number"
                {...register("price")}
                className="rounded-xl h-10"
              />
              {errors.price && (
                <p className="text-xs text-destructive">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                {...register("stock")}
                className="rounded-xl h-10"
              />
              {errors.stock && (
                <p className="text-xs text-destructive">
                  {errors.stock.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full rounded-xl h-11">
            Save Product
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
