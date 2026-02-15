import { CartItem, Product } from "@/types"
import { create } from "zustand"

type CartState = {
  items: CartItem[]
  addToCart: (product: Product) => void
  updateQuantity: (productId: number, quantity: number) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
}

const useCartStore = create<CartState>()((set) => ({
  items: [],
  addToCart: (product) =>
    set((state) => {
      const item = state.items.find((item) => item.id === product.id)
      if (item) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }
      }

      return {
        items: [...state.items, { ...product, quantity: 1 }],
      }
    }),
  updateQuantity: (productId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return { items: state.items.filter((item) => item.id !== productId) }
      }

      const item = state.items.find((item) => item.id === productId)
      if (item && item?.stock >= quantity) {
        return {
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item,
          ),
        }
      }

      return state
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    })),
  clearCart: () =>
    set(() => ({
      items: [],
    })),
}))

export default useCartStore
