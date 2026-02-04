"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye, Download, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Dummy Data
const DUMMY_ORDERS = [
  {
    id: 1,
    orderId: "ORD-001",
    total: 45000,
    date: "2024-02-03 14:30",
    items: 3,
    status: "Success",
  },
  {
    id: 2,
    orderId: "ORD-002",
    total: 18000,
    date: "2024-02-03 15:15",
    items: 1,
    status: "Success",
  },
  {
    id: 3,
    orderId: "ORD-003",
    total: 125000,
    date: "2024-02-03 16:00",
    items: 5,
    status: "Success",
  },
  {
    id: 4,
    orderId: "ORD-004",
    total: 22000,
    date: "2024-02-03 16:45",
    items: 1,
    status: "Cancelled",
  },
  {
    id: 5,
    orderId: "ORD-005",
    total: 60000,
    date: "2024-02-03 17:30",
    items: 4,
    status: "Success",
  },
]

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOrders = DUMMY_ORDERS.filter((order) =>
    order.orderId.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Order History</h1>
          <p className="text-muted-foreground">
            View and manage your previous transactions.
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download size={18} />
          Export Report
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search Order ID..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Calendar size={18} />
          Select Date
        </Button>
      </div>

      <div className="border rounded-lg bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-center">Items</TableHead>
              <TableHead className="text-right">Total Amount</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-bold">{order.orderId}</TableCell>
                <TableCell className="text-muted-foreground">
                  {order.date}
                </TableCell>
                <TableCell className="text-center">{order.items}</TableCell>
                <TableCell className="text-right font-medium">
                  Rp {order.total.toLocaleString("id-ID")}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={
                      order.status === "Success" ? "default" : "destructive"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye size={14} className="text-primary" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredOrders.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No orders found.
          </div>
        )}
      </div>
    </div>
  )
}
