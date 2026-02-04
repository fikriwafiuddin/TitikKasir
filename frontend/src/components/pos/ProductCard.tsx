"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Image from "next/image"
import { Product } from "@/types"
import useCartStore from "@/store/useCart"
import { toast } from "sonner"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart)

  const handleAddToCart = () => {
    addToCart(product)
    toast.success("Produk berhasil ditambahkan ke keranjang")
  }

  return (
    <Card
      className="overflow-hidden p-0 gap-2 hover:shadow-md transition-shadow cursor-pointer group"
      onClick={handleAddToCart}
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
      <CardContent className="px-3">
        <h3 className="font-semibold text-sm truncate">{product.name}</h3>
        <p className="text-primary font-bold">
          Rp {product.price.toLocaleString("id-ID")}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Stok: {product.stock}
        </p>
      </CardContent>
      <CardFooter className="p-3">
        <Button size="sm" className="w-full gap-2">
          <Plus size={16} />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
