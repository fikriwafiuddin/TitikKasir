"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import Receipt from "./Receipt"
import { Order, OrderItem } from "@/types"

type ReceiptDialogProps = {
  order: Order
  orderItems: OrderItem[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

function ReceiptDialog({
  order,
  orderItems,
  open,
  onOpenChange,
}: ReceiptDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <Receipt
          order={order}
          orderItems={orderItems}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

export default ReceiptDialog
