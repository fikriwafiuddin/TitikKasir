"use client"

import { usePOSStore } from "@/store/usePOSStore"
import { ProductCard } from "./ProductCard"

const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "Cappuccino",
    category: "Coffee",
    price: 25000,
    stock: 50,
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Espresso",
    category: "Coffee",
    price: 15000,
    stock: 100,
    image:
      "https://images.unsplash.com/photo-1510707577719-5d6815a2559a?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Latte",
    category: "Coffee",
    price: 28000,
    stock: 45,
    image:
      "https://images.unsplash.com/photo-1536939459926-301728717817?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Croissant",
    category: "Food",
    price: 32000,
    stock: 20,
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Brownies",
    category: "Food",
    price: 22000,
    stock: 30,
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Earl Grey Tea",
    category: "Non-Coffee",
    price: 18000,
    stock: 60,
    image:
      "https://images.unsplash.com/photo-1594631252845-ba9fb9bc37db?w=400&h=400&fit=crop",
  },
]

export function ProductGrid() {
  const searchQuery = usePOSStore((state) => state.searchQuery)
  const selectedCategory = usePOSStore((state) => state.selectedCategory)

  const filteredProducts = DUMMY_PRODUCTS.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="col-span-full py-20 text-center text-muted-foreground border-2 border-dashed rounded-xl">
          <p className="text-xl font-medium">No products found</p>
          <p className="text-sm">Try searching for something else</p>
        </div>
      )}
    </div>
  )
}
