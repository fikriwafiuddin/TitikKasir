"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Image from "next/image"

interface Product {
  id: number
  name: string
  price: number
  image?: string
  stock: number
}

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
      onClick={() => onAddToCart(product)}
    >
      <div className="relative aspect-square bg-muted">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground/40">
            No Image
          </div>
        )}
      </div>
      <CardContent className="p-3">
        <h3 className="font-semibold text-sm truncate">{product.name}</h3>
        <p className="text-primary font-bold">
          Rp {product.price.toLocaleString("id-ID")}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Stok: {product.stock}
        </p>
      </CardContent>
      <CardFooter className="p-3 pt-0">
        <Button size="sm" className="w-full gap-2">
          <Plus size={16} />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
