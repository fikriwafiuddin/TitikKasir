"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Receipt from "./Receipt"
import { OrderWithItems } from "@/types"

type ReceiptDialogProps = {
  orderWithItems: OrderWithItems
  open: boolean
  onOpenChange: (open: boolean) => void
}

function ReceiptDialog({
  orderWithItems,
  open,
  onOpenChange,
}: ReceiptDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="hidden">
          <DialogTitle>Struk Transaksi</DialogTitle>
        </DialogHeader>
        <Receipt
          orderWithItems={orderWithItems}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

export default ReceiptDialog
