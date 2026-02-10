"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import DataTable from "@/components/DataTable"
import columns from "./_components/columns"
import Link from "next/link"
import AppPagination from "@/components/AppPagination"
import { useCategories } from "@/services/hooks/useCategory"
import { useDebounce } from "@/hooks/useDebounce"

export default function CategoriesPage() {
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearch = useDebounce(searchQuery, 500)

  const { data, isLoading } = useCategories({
    page,
    limit: 10,
    name: debouncedSearch as string,
  })

  const categories = data?.data?.categories || []
  const meta = data?.meta

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Kategori</h1>
          <p className="text-muted-foreground">Kelola kategori produk Anda.</p>
        </div>

        <Button className="gap-2 rounded-xl" asChild>
          <Link href="/categories/add">
            <Plus size={18} />
            Tambah Kategori
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cari nama kategori..."
            className="pl-9 h-11 bg-card rounded-xl border-border/50"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchQuery(e.target.value)
              setPage(1)
            }}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="h-64 flex items-center justify-center border rounded-xl bg-card">
          <div className="animate-pulse text-muted-foreground">
            Memuat data...
          </div>
        </div>
      ) : (
        <DataTable columns={columns} data={categories} />
      )}

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
