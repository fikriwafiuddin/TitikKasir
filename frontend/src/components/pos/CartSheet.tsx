"use client"

import { usePOSStore } from "@/store/usePOSStore"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, Trash2, ReceiptText } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function CartSheet() {
  const { cart, updateQuantity, removeFromCart, getTotal, clearCart } =
    usePOSStore()
  const [isOpen, setIsOpen] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleCheckout = () => {
    if (cart.length === 0) return

    toast.success("Order successful!", {
      description: `Total amount: ${formatCurrency(getTotal())}`,
    })
    clearCart()
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl z-50 md:h-16 md:w-16 animate-in slide-in-from-bottom-10 duration-500"
        >
          <div className="relative">
            <ShoppingCart className="h-6 w-6 md:h-8 md:w-8" />
            {cart.length > 0 && (
              <span className="absolute -top-3 -right-3 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground ring-2 ring-background">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="flex items-center gap-2 text-2xl">
            <ShoppingCart className="size-6" /> Your Cart
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 p-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50 space-y-4">
              <ShoppingCart className="size-20" />
              <p className="text-xl font-medium">Empty Cart</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="h-16 w-16 rounded-lg overflow-hidden bg-muted shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold truncate">{item.name}</h4>
                    <p className="text-sm text-primary font-bold">
                      {formatCurrency(item.price)}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 rounded-sm"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="size-3" />
                      </Button>
                      <span className="text-sm font-medium w-4 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 rounded-sm"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="size-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="font-bold text-sm">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="p-6 bg-muted/30 border-t space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatCurrency(getTotal())}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax (0%)</span>
              <span>{formatCurrency(0)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-xl font-black">
              <span>Total</span>
              <span className="text-primary">{formatCurrency(getTotal())}</span>
            </div>
          </div>
          <Button
            className="w-full h-14 text-lg font-bold gap-2"
            disabled={cart.length === 0}
            onClick={handleCheckout}
          >
            <ReceiptText className="size-5" /> Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
