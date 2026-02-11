"use client"

import { useState } from "react"
import { ProductCard } from "@/components/pos/ProductCard"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import EmptyProducts from "./_components/EmptyProducts"
import CartSheet from "@/components/cart/CartSheet"
import AppPagination from "@/components/AppPagination"

import { useProducts } from "@/services/hooks/useProduct"
import { useCategories } from "@/services/hooks/useCategory"
import { useDebounce } from "@/hooks/useDebounce"

export default function POSPage() {
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryId, setCategoryId] = useState<string>("all")
  const debouncedSearch = useDebounce(searchQuery, 500)

  const { data: categoriesData } = useCategories({
    limit: 100,
  })

  const { data, isLoading } = useProducts({
    page,
    limit: 15,
    name: debouncedSearch as string,
    category_id: categoryId === "all" ? undefined : parseInt(categoryId),
  })

  const products = data?.data?.products || []
  const meta = data?.meta
  const categories = categoriesData?.data?.categories || []

  return (
    <div className="flex flex-col h-full gap-6 relative">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Point of Sale</h1>
          <p className="text-muted-foreground text-sm">
            Pilih produk yang ingin ditambahkan ke pesanan Anda.
          </p>
        </div>

        <div className="flex gap-4 flex-col">
          <div className="flex items-center gap-4">
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-24">
          {isLoading
            ? Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-muted animate-pulse rounded-2xl"
                />
              ))
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          {!isLoading && products.length === 0 && <EmptyProducts />}
        </div>

        {meta && meta.total_pages > 1 && (
          <AppPagination
            totalPages={meta.total_pages}
            currentPage={meta.current_page}
            onPageChange={setPage}
          />
        )}
      </div>

      <CartSheet />
    </div>
  )
}
