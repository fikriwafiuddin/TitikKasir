"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Receipt from "./Receipt"
import { useState } from "react"
import { Button } from "../ui/button"
import { EyeIcon } from "lucide-react"
import { OrderWithItems } from "@/types"

type ReceiptDialogProps = {
  orderWithItems: OrderWithItems
}

function ReceiptDialogButton({ orderWithItems }: ReceiptDialogProps) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg hover:bg-primary/10 hover:text-primary"
        >
          <EyeIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="hidden">
          <DialogTitle>Struk Transaksi</DialogTitle>
        </DialogHeader>
        <Receipt
          orderWithItems={orderWithItems}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

export default ReceiptDialogButton
