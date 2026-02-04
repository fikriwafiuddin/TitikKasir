"use client"

import { Button } from "@/components/ui/button"
import { Trash2, Minus, Plus, ShoppingCart, Receipt } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface CartProps {
  items: CartItem[]
  onUpdateQuantity: (id: number, delta: number) => void
  onRemoveItem: (id: number) => void
  onCheckout: () => void
}

export function Cart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )
  const tax = subtotal * 0.1 // Example 10% tax
  const total = subtotal + tax

  return (
    <div className="flex flex-col h-full bg-card border rounded-lg overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between bg-primary/5">
        <div className="flex items-center gap-2 font-bold">
          <ShoppingCart size={20} className="text-primary" />
          <span>Current Order</span>
        </div>
        <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
          {items.length} items
        </span>
      </div>

      <ScrollArea className="flex-1 p-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
            <ShoppingCart size={40} className="mb-2 opacity-20" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <span className="font-medium text-sm line-clamp-2">
                    {item.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Rp {item.price.toLocaleString("id-ID")}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onUpdateQuantity(item.id, -1)}
                    >
                      <Minus size={14} />
                    </Button>
                    <span className="text-sm font-semibold w-6 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onUpdateQuantity(item.id, 1)}
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <div className="p-4 bg-muted/30 border-t space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>Rp {subtotal.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax (10%)</span>
          <span>Rp {tax.toLocaleString("id-ID")}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-primary">
            Rp {total.toLocaleString("id-ID")}
          </span>
        </div>
        <Button
          className="w-full h-12 text-lg gap-2 cursor-pointer"
          disabled={items.length === 0}
          onClick={onCheckout}
        >
          <Receipt size={20} />
          Checkout
        </Button>
      </div>
    </div>
  )
}
