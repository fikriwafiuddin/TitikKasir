import { OrderWithItems } from "@/types"
import { CheckCircle2Icon, PrinterIcon, XIcon } from "lucide-react"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"

type ReceiptProps = {
  orderWithItems: OrderWithItems
  onClose?: () => void
}

function Receipt({ orderWithItems, onClose }: ReceiptProps) {
  return (
    <div className="max-h-[80vh] overflow-y-auto bg-white text-slate-800 p-8 font-mono text-sm relative">
      <div className="absolute top-4 right-4 text-emerald-500 animate-in fade-in zoom-in duration-500">
        <CheckCircle2Icon size={48} strokeWidth={1} />
      </div>
      <div className="text-center space-y-2 mb-8">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-2">
          <span className="text-white font-bold text-2xl">T</span>
        </div>
        <h2 className="text-xl font-bold tracking-tighter">TITIK KASIR</h2>
        <p className="text-xs text-muted-foreground uppercase tracking-widest">
          Transaksi Berhasil
        </p>
      </div>

      <div className="space-y-1 mb-6 border-y border-dashed py-4 border-slate-200">
        <div className="flex justify-between">
          <span>Order ID:</span>
          <span className="font-bold">{orderWithItems.orderId}</span>
        </div>
        <div className="flex justify-between">
          <span>Tanggal:</span>
          <span>{orderWithItems.date}</span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {orderWithItems.items.map((item, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-slate-900 font-bold">
              <span>{item.product?.name}</span>
              <span>
                Rp {(item.quantity * item.price).toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                {item.quantity} x Rp {item.price.toLocaleString("id-ID")}
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
            Rp {orderWithItems.totalAmount.toLocaleString("id-ID")}
          </span>
        </div>
      </div>

      <div className="text-center space-y-4 pt-4">
        <div className="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-200">
          <p className="text-xs font-bold mb-1 tracking-widest uppercase text-slate-400">
            Transaksi Selesai
          </p>
          <p className="text-[10px] text-muted-foreground italic">
            Terima kasih telah berbelanja di Titik Kasir!
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="grow rounded-xl h-12 gap-2"
            onClick={onClose}
          >
            <XIcon size={16} /> Tutup
          </Button>
          <Button className="grow rounded-xl h-12 gap-2">
            <PrinterIcon size={16} /> Print
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Receipt
