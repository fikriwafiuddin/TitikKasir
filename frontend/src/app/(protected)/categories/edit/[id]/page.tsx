"use client"

import { CategoryForm } from "@/components/category/CategoryForm"
import { Button } from "@/components/ui/button"
import { Category } from "@/types"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const category: Category = {
  id: 1,
  name: "Minuman",
  totalProducts: 12,
}

function EditCategoryPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Edit Kategori</h1>
          <p className="text-muted-foreground">
            Edit kategori di toko Anda di sini.
          </p>
        </div>

        <Button asChild>
          <Link href="/categories">
            <ArrowLeftIcon size={18} />
            Kembali
          </Link>
        </Button>
      </div>

      <CategoryForm
        category={category}
        onSuccess={() => router.push("/categories")}
      />
    </div>
  )
}

export default EditCategoryPage
