import { SearchIcon } from "lucide-react"

export default function EmptyProducts() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center p-20 text-muted-foreground bg-muted/10 rounded-[2rem] border-2 border-dashed border-border/50">
      <SearchIcon className="h-12 w-12 opacity-20 mb-4" />
      <p className="text-lg font-medium">Tidak ada produk yang ditemukan</p>
      <p className="text-sm">Coba kategori atau kata kunci lain.</p>
    </div>
  )
}
