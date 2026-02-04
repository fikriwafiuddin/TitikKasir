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
  quantity: number
  price: number
  subtotal: number
  product?: Product
}

export interface Order {
  id: number
  orderId: string
  items?: OrderItem[]
  totalAmount: number
  date: string
}

export interface CartItem extends Product {
  quantity: number
}
