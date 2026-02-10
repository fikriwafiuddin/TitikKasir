export interface Category {
  id: number
  name: string
  totalProducts?: number
  _count?: {
    products: number
  }
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
export interface CategoryQueryParams {
  page?: number
  limit?: number
  name?: string
}

export interface PaginationMeta {
  total_items: number
  total_pages: number
  current_page: number
  limit: number
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  meta?: object
}

export interface CategoryData {
  category: Category
}

export interface CategoriesData {
  categories: Category[]
}

export interface PaginatedResponse<T> {
  success: boolean
  message: string
  data: T
  meta: PaginationMeta
}
