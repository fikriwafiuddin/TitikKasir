"use client"

import { ProductForm } from "@/components/product/ProductForm"
import { Button } from "@/components/ui/button"
import { Product } from "@/types"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const product: Product = {
  id: 1,
  sku: "BRG001",
  name: "Kopi Susu Gula Aren",
  price: 18000,
  stock: 50,
  category: "Minuman",
}

export default function EditProductPage() {
  const router = useRouter()

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
