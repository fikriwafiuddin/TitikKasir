"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { useState } from "react"
import { Button } from "../ui/button"
import { ShoppingCart } from "lucide-react"
import useCartStore from "@/store/useCart"
import { Cart } from "./Cart"

interface CartSheetProps {
  onCheckoutSuccess: () => void
}

function CartSheet({ onCheckoutSuccess }: CartSheetProps) {
  const [open, setOpen] = useState(false)
  const cartItems = useCartStore((state) => state.items)

  const handleCheckoutSuccess = () => {
    onCheckoutSuccess()
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-20 right-8 h-16 px-8 rounded-full shadow-2xl gap-4 group transition-all hover:scale-105 active:scale-95 bg-primary"
        >
          <div className="relative">
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -top-3 -right-3 w-6 h-6 bg-destructive text-white text-[10px] font-bold rounded-full border-2 border-primary flex items-center justify-center animate-in zoom-in">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </div>
          <span className="text-lg font-bold">Lihat Keranjang</span>
          <div className="h-6 w-px bg-white/20 mx-1 hidden sm:block" />
          <span className="text-lg font-bold hidden sm:block">
            Rp{" "}
            {cartItems
              .reduce((sum, item) => sum + item.price * item.quantity, 0)
              .toLocaleString("id-ID")}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="hidden">
          <SheetTitle>Keranjang</SheetTitle>
        </SheetHeader>
        <Cart
          onOpenChange={setOpen}
          onCheckoutSuccess={handleCheckoutSuccess}
        />
      </SheetContent>
    </Sheet>
  )
}

export default CartSheet
