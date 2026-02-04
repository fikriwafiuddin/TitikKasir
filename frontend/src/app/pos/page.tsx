"use client"

import { useState } from "react"
import { ProductCard } from "@/components/pos/ProductCard"
import { Cart } from "@/components/pos/Cart"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Dummy Data
const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "Kopi Susu Gula Aren",
    price: 18000,
    stock: 50,
    category: "Minuman",
  },
  { id: 2, name: "Cafe Latte", price: 22000, stock: 30, category: "Minuman" },
  {
    id: 3,
    name: "Croissant Original",
    price: 15000,
    stock: 20,
    category: "Makanan",
  },
  {
    id: 4,
    name: "Brownies Choco",
    price: 12000,
    stock: 15,
    category: "Makanan",
  },
  { id: 5, name: "Matcha Latte", price: 24000, stock: 25, category: "Minuman" },
  { id: 6, name: "Espresso", price: 15000, stock: 100, category: "Minuman" },
  {
    id: 7,
    name: "Sandwich Tune",
    price: 25000,
    stock: 10,
    category: "Makanan",
  },
  {
    id: 8,
    name: "Muffin Blueberry",
    price: 18000,
    stock: 12,
    category: "Makanan",
  },
]

const CATEGORIES = ["All", "Minuman", "Makanan"]

export default function POSPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cartItems, setCartItems] = useState<any[]>([])

  const filteredProducts = DUMMY_PRODUCTS.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddToCart = (product: any) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta)
          return { ...item, quantity: newQty }
        }
        return item
      }),
    )
  }

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleCheckout = () => {
    alert("Checkout functionality will be implemented in Phase 3!")
    setCartItems([])
  }

  return (
    <div className="flex h-full gap-6 overflow-hidden">
      <div className="flex flex-1 flex-col gap-6 overflow-hidden">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Point of Sale</h1>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            {CATEGORIES.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="px-4 py-1 cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <p>No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      <div className="w-80 lg:w-96">
        <Cart
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  )
}
