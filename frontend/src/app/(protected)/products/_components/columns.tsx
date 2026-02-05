import { ColumnDef } from "@tanstack/react-table"
import { Product } from "@/types"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PencilIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn, formatCurrency } from "@/lib/utils"
import DeleteProduct from "@/components/product/DeleteProduct"

const columns: ColumnDef<Product>[] = [
  {
    header: "SKU",
    accessorKey: "sku",
    cell: ({ row }) => <div className="font-medium">{row.original.sku}</div>,
  },
  {
    header: "Nama Produk",
    accessorKey: "name",
    cell: ({ row }) => <div className="font-semibold">{row.original.name}</div>,
  },
  {
    header: "Kategori",
    accessorKey: "category",
    cell: ({ row }) => (
      <Badge variant="secondary" className="font-normal">
        {row.original.category}
      </Badge>
    ),
  },
  {
    header: () => <div className="text-right">Harga</div>,
    accessorKey: "price",
    cell: ({ row }) => (
      <div className="font-medium text-right">
        {formatCurrency(row.original.price)}
      </div>
    ),
  },
  {
    header: () => <div className="text-right">Stok</div>,
    accessorKey: "stock",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <span
            className={cn(
              "px-2 py-0.5 rounded-full text-xs font-bold",
              row.original.stock <= 10
                ? "bg-destructive/10 text-destructive"
                : "bg-emerald-500/10 text-emerald-600",
            )}
          >
            {row.original.stock}
          </span>
        </div>
      )
    },
  },
  {
    header: () => <div className="text-right pr-6">Aksi</div>,
    accessorKey: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-1 pr-6">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg hover:bg-blue-50 hover:text-blue-600"
            asChild
          >
            <Link href={`/products/edit/${row.original.id}`}>
              <PencilIcon className="h-4 w-4" />
            </Link>
          </Button>
          <DeleteProduct id={row.original.id} />
        </div>
      )
    },
  },
]

export default columns
