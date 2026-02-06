import DeleteCategory from "@/components/category/DeleteCategory"
import { Button } from "@/components/ui/button"
import { Category } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { PencilIcon } from "lucide-react"
import Link from "next/link"

const columns: ColumnDef<Category>[] = [
  {
    header: "Nama Kategori",
    accessorKey: "name",
    cell: ({ row }) => <div className="font-semibold">{row.original.name}</div>,
  },
  {
    header: () => <div className="text-right">Total Produk</div>,
    accessorKey: "totalProducts",
    cell: ({ row }) => (
      <div className="text-right">
        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
          {row.original.totalProducts || 0}
        </span>
      </div>
    ),
  },
  {
    header: () => <div className="text-right pr-6">Aksi</div>,
    accessorKey: "actions",
    cell: ({ row }) => (
      <div className="flex justify-end gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg hover:bg-blue-50 hover:text-blue-600"
          asChild
        >
          <Link href={`/categories/edit/${row.original.id}`}>
            <PencilIcon size={16} />
          </Link>
        </Button>
        <DeleteCategory id={row.original.id} />
      </div>
    ),
  },
]

export default columns
