"use client"

import { OrderWithItems } from "@/types"
import { Button } from "@/components/ui/button"
import { CircleXIcon, RefreshCwIcon, Loader2 } from "lucide-react"
import { useUpdateOrderStatus } from "@/services/hooks/useOrder"
import ReceiptDialogButton from "@/components/order/ReceiptDialogButton"

interface OrderActionsProps {
  order: OrderWithItems
}

export function OrderActions({ order }: OrderActionsProps) {
  const updateStatus = useUpdateOrderStatus()

  const handleUpdateStatus = (status: "SUCCESS" | "CANCELLED") => {
    updateStatus.mutate({ orderId: order.orderId, status })
  }

  const isPending = updateStatus.isPending

  return (
    <div className="flex justify-end gap-1">
      <ReceiptDialogButton orderWithItems={order} />
      {order.status === "SUCCESS" ? (
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg hover:bg-destructive/10 hover:text-destructive"
          onClick={() => handleUpdateStatus("CANCELLED")}
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <CircleXIcon size={16} />
          )}
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg hover:bg-primary/10 hover:text-primary"
          onClick={() => handleUpdateStatus("SUCCESS")}
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCwIcon size={16} />
          )}
        </Button>
      )}
    </div>
  )
}
