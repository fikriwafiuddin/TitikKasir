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
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { ProductForm } from "@/components/product/ProductForm"
import { Product } from "@/types"
import { ProductFormValues } from "@/validations/productValidation"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_DUMMY_PRODUCTS)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddProduct = (data: ProductFormValues) => {
    const newProduct: Product = {
      ...data,
      id: products.length + 1,
    }
    setProducts([newProduct, ...products])
    setIsAddOpen(false)
    toast.success("Product added successfully (Local State)")
  }

  const handleEditProduct = (data: ProductFormValues) => {
    if (!editingProduct) return
    const updatedProducts = products.map((p) =>
      p.id === editingProduct.id ? { ...p, ...data } : p,
    )
    setProducts(updatedProducts)
    setIsEditOpen(false)
    setEditingProduct(null)
    toast.success("Product updated successfully (Local State)")
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id))
    toast.error("Product deleted (Local State)")
  }

  const openEditDialog = (product: Product) => {
    setEditingProduct(product)
    setIsEditOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Product Management</h1>
          <p className="text-muted-foreground">
            Manage your product inventory here.
          </p>
        </div>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 rounded-xl">
              <Plus size={18} />
              Add Product
            </Button>
          </DialogTrigger>
          <ProductForm title="Add New Product" onSubmit={handleAddProduct} />
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search SKU or name..."
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
              <TableHead className="w-[100px] py-4">SKU</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow
                key={product.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-medium py-4">
                  {product.sku}
                </TableCell>
                <TableCell className="font-semibold">{product.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="rounded-lg font-normal">
                    {product.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  Rp {product.price.toLocaleString("id-ID")}
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-bold",
                      product.stock <= 10
                        ? "bg-destructive/10 text-destructive"
                        : "bg-emerald-500/10 text-emerald-600",
                    )}
                  >
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell className="text-right pr-6">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-lg hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => openEditDialog(product)}
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-lg hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredProducts.length === 0 && (
          <div className="p-12 text-center text-muted-foreground bg-muted/10">
            <Search className="mx-auto h-12 w-12 text-muted-foreground/20 mb-4" />
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm">Try adjusting your search query.</p>
          </div>
        )}
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        {editingProduct && (
          <ProductForm
            title="Edit Product"
            initialData={editingProduct}
            onSubmit={handleEditProduct}
          />
        )}
      </Dialog>
    </div>
  )
}
