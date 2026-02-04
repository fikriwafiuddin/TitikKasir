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
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { CategoryForm } from "@/components/category/CategoryForm"
import { Category } from "@/types"
import { CategoryFormValues } from "@/validations/categoryValidation"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

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
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddCategory = (data: CategoryFormValues) => {
    const newCategory: Category = {
      id: categories.length + 1,
      name: data.name,
      totalProducts: 0,
    }
    setCategories([newCategory, ...categories])
    setIsAddOpen(false)
    toast.success("Category added successfully")
  }

  const handleEditCategory = (data: CategoryFormValues) => {
    if (!editingCategory) return
    const updated = categories.map((c) =>
      c.id === editingCategory.id ? { ...c, name: data.name } : c,
    )
    setCategories(updated)
    setIsEditOpen(false)
    setEditingCategory(null)
    toast.success("Category updated successfully")
  }

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((c) => c.id !== id))
    toast.error("Category deleted")
  }

  const openEditDialog = (category: Category) => {
    setEditingCategory(category)
    setIsEditOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Category Management</h1>
          <p className="text-muted-foreground">
            Manage your product categories.
          </p>
        </div>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 rounded-xl">
              <Plus size={18} />
              Add Category
            </Button>
          </DialogTrigger>
          <CategoryForm title="Add New Category" onSubmit={handleAddCategory} />
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search category name..."
            className="pl-9 h-11 bg-card rounded-xl border-border/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-2xl bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="py-4 px-6">Category Name</TableHead>
              <TableHead className="text-right">Total Products</TableHead>
              <TableHead className="text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow
                key={category.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-semibold py-4 px-6">
                  {category.name}
                </TableCell>
                <TableCell className="text-right">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                    {category.totalProducts || 0}
                  </span>
                </TableCell>
                <TableCell className="text-right pr-6">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-lg hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => openEditDialog(category)}
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-lg hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredCategories.length === 0 && (
          <div className="p-12 text-center text-muted-foreground bg-muted/10">
            <Search className="mx-auto h-12 w-12 text-muted-foreground/20 mb-4" />
            <p className="text-lg font-medium">No categories found</p>
          </div>
        )}
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        {editingCategory && (
          <CategoryForm
            title="Edit Category"
            initialData={editingCategory}
            onSubmit={handleEditCategory}
          />
        )}
      </Dialog>
    </div>
  )
}
