"use client"

import { ProductForm } from "@/components/product/ProductForm"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AddProductPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tambah Produk</h1>
          <p className="text-muted-foreground">
            Tambahkan produk baru di toko Anda di sini.
          </p>
        </div>

        <Button asChild>
          <Link href="/products">
            <ArrowLeftIcon size={18} />
            Kembali
          </Link>
        </Button>
      </div>

      <ProductForm onSuccess={() => router.push("/products")} />
    </div>
  )
}
