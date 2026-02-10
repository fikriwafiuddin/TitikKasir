"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { PlusIcon, Search } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import columns from "./_components/columns"
import DataTable from "@/components/DataTable"
import AppPagination from "@/components/AppPagination"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import { useProducts } from "@/services/hooks/useProduct"
import { useCategories } from "@/services/hooks/useCategory"
import { useDebounce } from "@/hooks/useDebounce"

export default function ProductsPage() {
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryId, setCategoryId] = useState<string>("all")
  const debouncedSearch = useDebounce(searchQuery, 500)

  const { data: categoriesData } = useCategories({
    limit: 100,
  })

  const { data, isLoading } = useProducts({
    page,
    limit: 10,
    name: debouncedSearch as string,
    category_id: categoryId === "all" ? undefined : parseInt(categoryId),
  })

  const products = data?.data?.products || []
  const meta = data?.meta
  const categories = categoriesData?.data?.categories || []

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Produk</h1>
          <p className="text-muted-foreground">
            Kelola produk di toko Anda di sini.
          </p>
        </div>

        <Button className="gap-2 rounded-xl" asChild>
          <Link href="/products/add">
            <PlusIcon size={18} />
            Tambah Produk
          </Link>
        </Button>
      </div>

      <div className="flex gap-4 flex-col">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cari nama produk..."
            className="pl-9 h-11 bg-card rounded-xl border-border/50"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setPage(1)
            }}
          />
        </div>

        <Select
          value={categoryId}
          onValueChange={(value) => {
            setCategoryId(value)
            setPage(1)
          }}
        >
          <SelectTrigger className="w-full sm:w-64 h-11 rounded-xl bg-card border-border/50">
            <SelectValue placeholder="Semua Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kategori</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DataTable columns={columns} data={products} isLoading={isLoading} />

      {meta && (
        <AppPagination
          totalPages={meta.total_pages}
          currentPage={meta.current_page}
          onPageChange={setPage}
        />
      )}
    </div>
  )
}
