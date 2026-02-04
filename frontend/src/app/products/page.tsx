"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  MoreHorizontal,
  ArrowUpDown,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Dummy Data (extended for table view)
const DUMMY_PRODUCTS = [
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

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = DUMMY_PRODUCTS.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Product Management</h1>
          <p className="text-muted-foreground">
            Manage your product inventory here.
          </p>
        </div>
        <Button className="gap-2">
          <Plus size={18} />
          Add Product
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search SKU or name..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-lg bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">SKU</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.sku}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{product.category}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  Rp {product.price.toLocaleString("id-ID")}
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={
                      product.stock <= 10 ? "text-destructive font-bold" : ""
                    }
                  >
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil size={14} className="text-blue-500" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 size={14} className="text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredProducts.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No products found.
          </div>
        )}
      </div>
    </div>
  )
}
