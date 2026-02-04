"use client"

import { useState, ChangeEvent } from "react"
import { ProductCard } from "@/components/pos/ProductCard"
import { Cart } from "@/components/pos/Cart"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart, X, Printer, CheckCircle2 } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

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
  const [isReceiptOpen, setIsReceiptOpen] = useState(false)
  const [lastOrder, setLastOrder] = useState<any>(null)

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
    toast.success(`${product.name} added to cart`)
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
    const total =
      cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.1
    const orderId = `ORD-${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`

    setLastOrder({
      orderId,
      items: [...cartItems],
      total,
      date: new Date().toLocaleString("id-ID"),
    })

    setCartItems([])
    setIsReceiptOpen(true)
    toast.success("Checkout successful!")
  }

  return (
    <div className="flex flex-col h-full gap-6 relative">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Point of Sale
              </h1>
              <p className="text-muted-foreground text-sm">
                Select products to add to current order.
              </p>
            </div>

            <div className="flex gap-2">
              <div className="relative w-64 md:w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 h-11 bg-card rounded-xl border-border/50"
                  value={searchQuery}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="rounded-xl px-6 h-10 border-border/50 transition-all font-medium"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-24">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center p-20 text-muted-foreground bg-muted/10 rounded-[2rem] border-2 border-dashed border-border/50">
              <Search className="h-12 w-12 opacity-20 mb-4" />
              <p className="text-lg font-medium">No products found</p>
              <p className="text-sm">Try another category or search term.</p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Cart Button */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="lg"
            className="fixed bottom-8 right-8 h-16 px-8 rounded-full shadow-2xl gap-4 group transition-all hover:scale-105 active:scale-95 bg-primary"
          >
            <div className="relative">
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-3 -right-3 w-6 h-6 bg-destructive text-white text-[10px] font-bold rounded-full border-2 border-primary flex items-center justify-center animate-in zoom-in">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </div>
            <span className="text-lg font-bold">View Cart</span>
            <div className="h-6 w-px bg-white/20 mx-1 hidden sm:block" />
            <span className="text-lg font-bold hidden sm:block">
              Rp{" "}
              {cartItems
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toLocaleString("id-ID")}
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md p-0 border-none bg-background">
          <Cart
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
          />
        </SheetContent>
      </Sheet>

      {/* Checkout Receipt Dialog */}
      <Dialog open={isReceiptOpen} onOpenChange={setIsReceiptOpen}>
        <DialogContent className="sm:max-w-[400px] rounded-[2rem] p-0 overflow-hidden border-none shadow-2xl">
          {lastOrder && (
            <div className="bg-white text-slate-800 p-8 font-mono text-sm relative">
              <div className="absolute top-4 right-4 text-emerald-500 animate-in fade-in zoom-in duration-500">
                <CheckCircle2 size={48} strokeWidth={1} />
              </div>
              <div className="text-center space-y-2 mb-8">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-2xl">T</span>
                </div>
                <h2 className="text-xl font-bold tracking-tighter">
                  TITIK KASIR
                </h2>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  Transaction Successful
                </p>
              </div>

              <div className="space-y-1 mb-6 border-y border-dashed py-4 border-slate-200">
                <div className="flex justify-between">
                  <span>Order ID:</span>
                  <span className="font-bold">{lastOrder.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{lastOrder.date}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {lastOrder.items.map((item: any, i: number) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-slate-900 font-bold">
                      <span>{item.name}</span>
                      <span>
                        Rp{" "}
                        {(
                          item.qty || item.quantity * item.price
                        ).toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>
                        {item.qty || item.quantity} x Rp{" "}
                        {item.price.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-slate-200 mb-6" />

              <div className="space-y-2 mb-8">
                <div className="flex justify-between text-lg font-bold">
                  <span>TOTAL</span>
                  <span className="text-primary text-xl">
                    Rp {lastOrder.total.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <div className="text-center space-y-4 pt-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-xs font-bold mb-1 tracking-widest uppercase text-slate-400">
                    Payment Complete
                  </p>
                  <p className="text-[10px] text-muted-foreground italic">
                    Thank you for your purchase!
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="grow rounded-xl h-12 gap-2"
                    onClick={() => setIsReceiptOpen(false)}
                  >
                    <X size={16} /> Close
                  </Button>
                  <Button className="grow rounded-xl h-12 gap-2">
                    <Printer size={16} /> Print
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
