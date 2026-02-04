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
import { Plus, Search, Pencil, Trash2 } from "lucide-react"

// Dummy Data
const DUMMY_CATEGORIES = [
  { id: 1, name: "Minuman", totalProducts: 12 },
  { id: 2, name: "Makanan", totalProducts: 8 },
  { id: 3, name: "Snack", totalProducts: 5 },
  { id: 4, name: "Peralatan", totalProducts: 3 },
]

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = DUMMY_CATEGORIES.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Category Management</h1>
          <p className="text-muted-foreground">
            Organize your products into categories.
          </p>
        </div>
        <Button className="gap-2">
          <Plus size={18} />
          Add Category
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search category name..."
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
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead>Total Products</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium text-muted-foreground">
                  #{category.id}
                </TableCell>
                <TableCell className="font-semibold">{category.name}</TableCell>
                <TableCell>{category.totalProducts} items</TableCell>
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
        {filteredCategories.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No categories found.
          </div>
        )}
      </div>
    </div>
  )
}
