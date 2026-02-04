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
import {
  Search,
  Eye,
  Download,
  Calendar,
  Printer,
  X,
  Pencil,
  Trash2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

// Dummy Data
const DUMMY_ORDERS = [
  {
    id: 1,
    orderId: "ORD-001",
    total: 45000,
    date: "2024-02-03 14:30",
    items: [
      { name: "Kopi Susu Gula Aren", qty: 2, price: 18000 },
      { name: "Croissant", qty: 1, price: 9000 },
    ],
    status: "Success",
  },
  {
    id: 2,
    orderId: "ORD-002",
    total: 18000,
    date: "2024-02-03 15:15",
    items: [{ name: "Cafe Latte", qty: 1, price: 18000 }],
    status: "Success",
  },
  {
    id: 3,
    orderId: "ORD-003",
    total: 125000,
    date: "2024-02-03 16:00",
    items: [
      { name: "Matcha Latte", qty: 3, price: 25000 },
      { name: "Sandwich", qty: 2, price: 25000 },
    ],
    status: "Success",
  },
  {
    id: 4,
    orderId: "ORD-004",
    total: 22000,
    date: "2024-02-03 16:45",
    items: [{ name: "Cafe Latte", qty: 1, price: 22000 }],
    status: "Cancelled",
  },
  {
    id: 5,
    orderId: "ORD-005",
    total: 60000,
    date: "2024-02-03 17:30",
    items: [{ name: "Kopi Susu Gula Aren", qty: 3, price: 20000 }],
    status: "Success",
  },
]

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isReceiptOpen, setIsReceiptOpen] = useState(false)

  const filteredOrders = DUMMY_ORDERS.filter((order) =>
    order.orderId.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const openReceipt = (order: any) => {
    setSelectedOrder(order)
    setIsReceiptOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Order History</h1>
          <p className="text-muted-foreground text-sm">
            Review your past sales and transaction details.
          </p>
        </div>
        <Button variant="outline" className="gap-2 rounded-xl">
          <Download size={18} />
          Export CSV
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search Order ID..."
            className="pl-10 h-11 bg-card rounded-xl border-border/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2 rounded-xl h-11 px-4">
          <Calendar size={18} />
          <span>Filter Date</span>
        </Button>
      </div>

      <div className="border rounded-2xl bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="py-4 px-6">Order ID</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead className="text-center">Items</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow
                key={order.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-bold py-4 px-6 text-primary">
                  {order.orderId}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {order.date}
                </TableCell>
                <TableCell className="text-center font-medium">
                  {order.items.length}
                </TableCell>
                <TableCell className="text-right font-bold">
                  Rp {order.total.toLocaleString("id-ID")}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    className="rounded-lg px-2 flex-shrink-0"
                    variant={
                      order.status === "Success" ? "default" : "destructive"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right pr-6">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-lg hover:bg-primary/10 hover:text-primary"
                      onClick={() => openReceipt(order)}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-lg hover:bg-blue-50 hover:text-blue-600"
                      onClick={() =>
                        toast.info(`Editing order ${order.orderId}`)
                      }
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-lg hover:bg-destructive/10 hover:text-destructive"
                      onClick={() =>
                        toast.error(`Deleted order ${order.orderId}`)
                      }
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredOrders.length === 0 && (
          <div className="p-12 text-center text-muted-foreground bg-muted/10">
            <Search className="mx-auto h-12 w-12 text-muted-foreground/20 mb-4" />
            <p className="text-lg font-medium">No orders found</p>
          </div>
        )}
      </div>

      <Dialog open={isReceiptOpen} onOpenChange={setIsReceiptOpen}>
        <DialogContent className="sm:max-w-[400px] rounded-[2rem] p-0 overflow-hidden border-none shadow-2xl">
          {selectedOrder && (
            <div className="bg-white text-slate-800 p-8 font-mono text-sm relative">
              <div className="text-center space-y-2 mb-8">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-2xl">T</span>
                </div>
                <h2 className="text-xl font-bold tracking-tighter">
                  TITIK KASIR
                </h2>
                <p className="text-xs text-muted-foreground">
                  Jl. Sudirman No. 123, Jakarta
                  <br />
                  Ph: (021) 555-0123
                </p>
              </div>

              <div className="space-y-1 mb-6 border-y border-dashed py-4 border-slate-200">
                <div className="flex justify-between">
                  <span>Order ID:</span>
                  <span className="font-bold">{selectedOrder.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{selectedOrder.date}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cashier:</span>
                  <span>Admin</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {selectedOrder.items.map((item: any, i: number) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-slate-900 font-bold">
                      <span>{item.name}</span>
                      <span>
                        Rp {(item.qty * item.price).toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>
                        {item.qty} x Rp {item.price.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-slate-200 mb-6" />

              <div className="space-y-2 mb-8">
                <div className="flex justify-between text-lg font-bold">
                  <span>TOTAL</span>
                  <span className="text-primary text-xl">
                    Rp {selectedOrder.total.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Payment:</span>
                  <span>Cash</span>
                </div>
              </div>

              <div className="text-center space-y-4 pt-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-xs font-bold mb-1 tracking-widest uppercase text-slate-400">
                    Thank You!
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Please come back again soon.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="grow rounded-xl h-11 gap-2"
                    onClick={() => setIsReceiptOpen(false)}
                  >
                    <X size={16} /> Close
                  </Button>
                  <Button className="grow rounded-xl h-11 gap-2">
                    <Printer size={16} /> Print
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
