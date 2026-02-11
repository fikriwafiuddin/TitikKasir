"use client"

import { ProductForm } from "@/components/product/ProductForm"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useProductDetail } from "@/services/hooks/useProduct"
import { ProductFormSkeleton } from "@/components/skeleton/ProductFormSkeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const id = parseInt(params.id as string)

  const { data: product, isLoading } = useProductDetail(id)

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-40 mb-2" />
            <Skeleton className="h-4 w-60" />
          </div>
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
        <ProductFormSkeleton />
      </div>
    )
  }

  if (!product) {
    return <div>Produk tidak ditemukan.</div>
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Edit Produk</h1>
          <p className="text-muted-foreground">Perbarui produk Anda di sini.</p>
        </div>

        <Button asChild>
          <Link href="/products">
            <ArrowLeftIcon size={18} />
            Kembali
          </Link>
        </Button>
      </div>

      <ProductForm
        product={product}
        onSuccess={() => router.push("/products")}
        mode="edit"
      />
    </div>
  )
}
