import { ColumnDef } from "@tanstack/react-table"
import { OrderWithItems } from "@/types"
import { Button } from "@/components/ui/button"
import { CircleXIcon, RefreshCwIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, translateStatus } from "@/lib/utils"
import ReceiptDialogButton from "@/components/order/ReceiptDialogButton"

const columns: ColumnDef<OrderWithItems>[] = [
  {
    accessorKey: "orderId",
    header: () => <div className="py-4 px-6">Order ID</div>,
    cell: ({ row }) => (
      <span className="font-bold py-4 px-6">{row.original.orderId}</span>
    ),
  },
  {
    accessorKey: "date",
    header: "Tanggal & Waktu",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.date}</span>
    ),
  },
  {
    accessorKey: "totalItems",
    header: "Total Item",
    cell: ({ row }) => (
      <span className="font-bold block">{row.original.items.length}</span>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: "Total",
    cell: ({ row }) => (
      <span className="font-bold">
        {formatCurrency(row.original.totalAmount)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        className="rounded-lg px-2 shrink-0"
        variant={row.original.status === "success" ? "default" : "destructive"}
      >
        {translateStatus(row.original.status)}
      </Badge>
    ),
  },
  {
    accessorKey: "actions",
    header: () => <span className="block text-right pr-6">Aksi</span>,
    cell: ({ row }) => (
      <div className="flex justify-end gap-1">
        <ReceiptDialogButton orderWithItems={row.original} />
        {row.original.status === "success" ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg hover:bg-destructive/10 hover:text-destructive"
          >
            <CircleXIcon size={16} />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg hover:bg-destructive/10 hover:text-destructive"
          >
            <RefreshCwIcon size={16} />
          </Button>
        )}
      </div>
    ),
  },
]

export default columns
