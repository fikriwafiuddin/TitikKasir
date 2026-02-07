export interface Category {
  id: number
  name: string
  totalProducts?: number
}

export interface Product {
  id: number
  sku: string
  name: string
  price: number
  stock: number
  category: string
  categoryId?: number
  image?: string
}

export interface OrderItem {
  id: number
  productId: number
  productName: string
  quantity: number
  price: number
  subtotal: number
}

export interface OrderItemWithProduct extends OrderItem {
  product?: Product
}

export interface Order {
  id: number
  orderId: string
  totalAmount: number
  date: string
  status: "success" | "cancelled"
}

export interface OrderWithItems extends Order {
  items: OrderItemWithProduct[]
}

export interface CartItem extends Product {
  quantity: number
}
