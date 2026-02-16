"use client"

import { CategoryForm } from "@/components/category/CategoryForm"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { useCategory } from "@/services/hooks/useCategory"
import { useParams, notFound } from "next/navigation"
import { AxiosError } from "axios"
import ErrorState from "@/components/ErrorState"
import { CategoryFormSkeleton } from "@/components/skeleton/CategoryFormSkeleton"
import { Skeleton } from "@/components/ui/skeleton"

function EditCategoryPage() {
  const router = useRouter()
  const params = useParams()
  const id = Number(params.id)

  const { data: category, isLoading, isError, error, refetch } = useCategory(id)

  if (isError) {
    const axiosError = error as AxiosError
    if (axiosError.response?.status === 404) {
      return notFound()
    }
    return (
      <div className="py-20">
        <ErrorState
          title="Gagal Memuat Kategori"
          message="Terjadi kesalahan saat mengambil detail kategori. Pastikan ID kategori benar atau coba lagi nanti."
          onRetry={refetch}
        />
      </div>
    )
  }

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
        <CategoryFormSkeleton />
      </div>
    )
  }

  if (!isLoading && !category) {
    return notFound()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Edit Kategori</h1>
          <p className="text-muted-foreground">
            Edit kategori di toko Anda di sini.
          </p>
        </div>

        <Button asChild variant="outline">
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
