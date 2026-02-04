"use client"

import { useState, ChangeEvent } from "react"
import { ProductCard } from "@/components/pos/ProductCard"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import EmptyProducts from "./_components/EmptyProducts"
import { Order, Product } from "@/types"
import CartSheet from "@/components/cart/CartSheet"
import ReceiptDialog from "@/components/order/ReceiptDialog"
import useCartStore from "@/store/useCart"
import AppPagination from "@/components/AppPagination"

// Dummy Data
const DUMMY_PRODUCTS: Product[] = [
  {
    id: 1,
    sku: "CAP-001",
    name: "Cappuccino",
    category: "Coffee",
    price: 25000,
    stock: 50,
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    sku: "ESP-002",
    name: "Espresso",
    category: "Coffee",
    price: 15000,
    stock: 100,
    image:
      "https://images.unsplash.com/photo-1510707577719-5d6815a2559a?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    sku: "LAT-003",
    name: "Latte",
    category: "Coffee",
    price: 28000,
    stock: 45,
    image:
      "https://images.unsplash.com/photo-1536939459926-301728717817?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    sku: "CRO-004",
    name: "Croissant",
    category: "Food",
    price: 32000,
    stock: 20,
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    sku: "BRO-005",
    name: "Brownies",
    category: "Food",
    price: 22000,
    stock: 30,
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    sku: "TEA-006",
    name: "Earl Grey Tea",
    category: "Non-Coffee",
    price: 18000,
    stock: 60,
    image:
      "https://images.unsplash.com/photo-1594631252845-ba9fb9bc37db?w=400&h=400&fit=crop",
  },
]

const CATEGORIES = ["All", "Coffee", "Food", "Non-Coffee"]

export default function POSPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isReceiptOpen, setIsReceiptOpen] = useState(false)
  const [lastOrder, setLastOrder] = useState<Order | null>(null)
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)

  const filteredProducts = DUMMY_PRODUCTS.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const handleCheckout = () => {
    const total =
      items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.1
    const orderId = `ORD-${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`

    setLastOrder({
      id: 0,
      orderId,
      items: items.map((item) => ({
        id: item.id,
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity,
      })),
      totalAmount: total,
      date: new Date().toLocaleString("id-ID"),
    })

    clearCart()
    setIsReceiptOpen(true)
    toast.success("Checkout berhasil!")
  }

  return (
    <div className="flex flex-col h-full gap-6 relative">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Point of Sale</h1>
            <p className="text-muted-foreground text-sm">
              Pilih produk yang ingin ditambahkan ke pesanan Anda.
            </p>
          </div>

          <div className="flex gap-4 flex-col justify-between">
            <div className="flex flex-1 gap-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari produk..."
                  className="pl-10 h-11 bg-card rounded-xl border-border/50"
                  value={searchQuery}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.target.value)
                  }
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
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-24">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {filteredProducts.length === 0 && <EmptyProducts />}
        </div>

        <AppPagination totalPages={3} currentPage={1} />
      </div>

      <CartSheet onCheckoutSuccess={handleCheckout} />

      {/* Checkout Receipt Dialog */}
      {lastOrder && (
        <ReceiptDialog
          open={isReceiptOpen}
          onOpenChange={setIsReceiptOpen}
          order={lastOrder}
          orderItems={lastOrder?.items || []}
        />
      )}
    </div>
  )
}
