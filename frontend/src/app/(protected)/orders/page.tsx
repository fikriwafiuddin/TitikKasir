"use client"

import columns from "./_components/columns"
import { OrderWithItems } from "@/types"
import DataTable from "@/components/DataTable"
import AppPagination from "@/components/AppPagination"
import FiltersSection from "./_components/FiltersSection"

// Dummy Data
const DUMMY_ORDERS: OrderWithItems[] = [
  {
    id: 1,
    orderId: "ORD-001",
    totalAmount: 45000,
    date: "2024-02-03 14:30",
    items: [
      {
        id: 1,
        productId: 1,
        productName: "Kopi Susu Gula Aren",
        quantity: 2,
        price: 18000,
        subtotal: 36000,
      },
      {
        id: 2,
        productId: 2,
        productName: "Croissant",
        quantity: 1,
        price: 9000,
        subtotal: 9000,
      },
    ],
    status: "success",
  },
  {
    id: 2,
    orderId: "ORD-002",
    totalAmount: 18000,
    date: "2024-02-03 15:15",
    items: [
      {
        id: 3,
        productId: 3,
        productName: "Cafe Latte",
        quantity: 1,
        price: 18000,
        subtotal: 18000,
      },
    ],
    status: "success",
  },
  {
    id: 3,
    orderId: "ORD-003",
    totalAmount: 125000,
    date: "2024-02-03 16:00",
    items: [
      {
        id: 4,
        productId: 4,
        productName: "Matcha Latte",
        quantity: 3,
        price: 25000,
        subtotal: 75000,
      },
      {
        id: 5,
        productId: 5,
        productName: "Sandwich",
        quantity: 2,
        price: 25000,
        subtotal: 50000,
      },
    ],
    status: "success",
  },
  {
    id: 4,
    orderId: "ORD-004",
    totalAmount: 22000,
    date: "2024-02-03 16:45",
    items: [
      {
        id: 6,
        productId: 6,
        productName: "Cafe Latte",
        quantity: 1,
        price: 22000,
        subtotal: 22000,
      },
    ],
    status: "cancelled",
  },
  {
    id: 5,
    orderId: "ORD-005",
    totalAmount: 60000,
    date: "2024-02-03 17:30",
    items: [
      {
        id: 7,
        productId: 7,
        productName: "Kopi Susu Gula Aren",
        quantity: 3,
        price: 20000,
        subtotal: 60000,
      },
    ],
    status: "success",
  },
]

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Riwayat Pesanan</h1>
          <p className="text-muted-foreground text-sm">
            Tinjau pesanan Anda sebelumnya dan detail pesanan.
          </p>
        </div>
        {/* <Button variant="outline" className="gap-2 rounded-xl">
          <Download size={18} />
          Export CSV
        </Button> */}
      </div>

      <FiltersSection />

      <DataTable columns={columns} data={DUMMY_ORDERS} />

      <AppPagination totalPages={4} currentPage={1} />
    </div>
  )
}
