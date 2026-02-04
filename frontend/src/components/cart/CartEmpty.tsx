import { ShoppingCartIcon } from "lucide-react"

function CartEmpty() {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground text-center">
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6 opacity-20">
        <ShoppingCartIcon size={40} />
      </div>
      <h4 className="font-bold text-slate-900 text-lg">Keranjang Kosong</h4>
      <p className="text-sm max-w-[200px] mx-auto mt-2">
        Sepertinya Anda belum menambahkan apa pun ke keranjang.
      </p>
    </div>
  )
}

export default CartEmpty
