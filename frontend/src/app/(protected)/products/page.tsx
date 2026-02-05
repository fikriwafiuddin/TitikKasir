"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Category, Product } from "@/types"
import { Label } from "@/components/ui/label"
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

// Dummy Data (extended for table view)
const INITIAL_DUMMY_PRODUCTS: Product[] = [
  {
    id: 1,
    sku: "BRG001",
    name: "Kopi Susu Gula Aren",
    price: 18000,
    stock: 50,
    category: "Minuman",
  },
  {
    id: 2,
    sku: "BRG002",
    name: "Cafe Latte",
    price: 22000,
    stock: 30,
    category: "Minuman",
  },
  {
    id: 3,
    sku: "BRG003",
    name: "Croissant Original",
    price: 15000,
    stock: 20,
    category: "Makanan",
  },
  {
    id: 4,
    sku: "BRG004",
    name: "Brownies Choco",
    price: 12000,
    stock: 15,
    category: "Makanan",
  },
  {
    id: 5,
    sku: "BRG005",
    name: "Matcha Latte",
    price: 24000,
    stock: 25,
    category: "Minuman",
  },
  {
    id: 6,
    sku: "BRG006",
    name: "Espresso",
    price: 15000,
    stock: 100,
    category: "Minuman",
  },
  {
    id: 7,
    sku: "BRG007",
    name: "Sandwich Tune",
    price: 25000,
    stock: 10,
    category: "Makanan",
  },
  {
    id: 8,
    sku: "BRG008",
    name: "Muffin Blueberry",
    price: 18000,
    stock: 12,
    category: "Makanan",
  },
]

const categories: Category[] = [
  {
    id: 1,
    name: "Makanan",
  },
  {
    id: 2,
    name: "Minuman",
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_DUMMY_PRODUCTS)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Manajemen Produk</h1>
        <p className="text-muted-foreground">
          Kelola produk di toko Anda di sini.
        </p>
      </div>

      <div className="flex gap-4 flex-col">
        <div className="flex flex-1 gap-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari produk..."
              className="pl-10 h-11 bg-card rounded-xl border-border/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Kategori:</Label>
          <Select>
            <SelectTrigger className="min-w-64">
              <SelectValue placeholder="Pilih Kategori" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <DataTable columns={columns} data={filteredProducts} />

      <AppPagination totalPages={4} currentPage={1} />
    </div>
  )
}
