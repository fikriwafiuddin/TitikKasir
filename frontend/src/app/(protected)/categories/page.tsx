"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { Category } from "@/types"
import DataTable from "@/components/DataTable"
import columns from "./_components/columns"
import Link from "next/link"
import AppPagination from "@/components/AppPagination"

// Dummy Data
const INITIAL_DUMMY_CATEGORIES: Category[] = [
  { id: 1, name: "Minuman", totalProducts: 12 },
  { id: 2, name: "Makanan", totalProducts: 8 },
  { id: 3, name: "Snack", totalProducts: 15 },
  { id: 4, name: "Peralatan", totalProducts: 5 },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(
    INITIAL_DUMMY_CATEGORIES,
  )
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <DataTable columns={columns} data={filteredCategories} />

      <AppPagination totalPages={4} currentPage={1} />
    </div>
  )
}
