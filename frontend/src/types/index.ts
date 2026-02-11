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
  category: {
    name: string
  }
  category_id: number
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
  status: "SUCCESS" | "CANCELLED"
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

export interface ProductQueryParams {
  page?: number
  limit?: number
  name?: string
  category_id?: number
}

export interface ProductData {
  product: Product
}

export interface ProductsData {
  products: Product[]
}

export interface CreateOrderItem {
  product_id: number
  product_name: string
  unit_price: number
  quantity: number
  sub_total: number
}

export interface CreateOrderData {
  total_amount: number
  items: CreateOrderItem[]
}

export interface OrderQueryParams {
  page?: number
  limit?: number
  search?: string
  status?: string
  date?: string
  month?: string
  year?: string
}

export interface OrderData {
  order: OrderWithItems
}

export interface OrdersData {
  orders: OrderWithItems[]
}

export interface PaginatedResponse<T> {
  success: boolean
  message: string
  data: T
  meta: PaginationMeta
}
