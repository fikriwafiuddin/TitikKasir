"use client"

import { Button } from "@/components/ui/button"
import {
  Trash2,
  Minus,
  Plus,
  ShoppingCart,
  Receipt,
  RefreshCwIcon,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import useCartStore from "@/store/useCart"
import CartEmpty from "./CartEmpty"
import Image from "next/image"

import { useCreateOrder } from "@/services/hooks/useOrder"
import { Spinner } from "../ui/spinner"
import { OrderWithItems } from "@/types"

interface CartProps {
  onOpenChange: (open: boolean) => void
  onCheckoutSuccess: (order: OrderWithItems) => void
}

export function Cart({ onOpenChange, onCheckoutSuccess }: CartProps) {
  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const clearCart = useCartStore((state) => state.clearCart)
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  const createOrder = useCreateOrder()

  const handleCheckout = () => {
    createOrder.mutate(
      {
        total_amount: subtotal,
        items: items.map((item) => ({
          product_id: item.id,
          product_name: item.name,
          unit_price: item.price,
          quantity: item.quantity,
          sub_total: item.price * item.quantity,
        })),
      },
      {
        onSuccess: (data) => {
          onCheckoutSuccess(data)
          onOpenChange(false)
          clearCart()
        },
      },
    )
  }

  return (
    <div className="flex flex-col h-screen bg-background relative overflow-hidden">
      <div className="px-6 py-2 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <ShoppingCart size={22} />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-none">Keranjang</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {items.length} item ditambahkan
            </p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 px-6 overflow-y-scroll">
        {items.length === 0 ? (
          <CartEmpty />
        ) : (
          <div className="py-6 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative flex gap-4 items-start"
              >
                <div className="relative w-16 h-16 rounded-2xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/5 transition-colors">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors">
                      {item.name.substring(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-sm leading-tight line-clamp-2 pr-2">
                      {item.name}
                    </h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 -mt-1 -mr-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-primary">
                      Rp {item.price.toLocaleString("id-ID")}
                    </span>
                    <div className="flex items-center bg-muted/50 rounded-lg p-0.5 border">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-md hover:bg-white"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus size={12} />
                      </Button>
                      <span className="text-sm font-bold w-7 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-md hover:bg-white"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus size={12} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <div className="px-6 py-2 bg-card border-t border-border/50 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-end pt-2">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
                Jumlah Total
              </span>
              <span className="text-2xl font-black text-primary leading-none">
                Rp {subtotal.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            className="flex-1"
            variant="outline"
            onClick={() => clearCart()}
            disabled={items.length === 0}
          >
            <RefreshCwIcon /> Reset
          </Button>
          <Button
            className="flex-1"
            disabled={items.length === 0 || createOrder.isPending}
            onClick={handleCheckout}
          >
            {createOrder.isPending ? (
              <Spinner />
            ) : (
              <>
                <div className="p-1 px-2.5 bg-white/20 rounded-lg">
                  <Receipt size={18} />
                </div>
                Proses Pesanan
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
