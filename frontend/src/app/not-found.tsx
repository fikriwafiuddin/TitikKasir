"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  HomeIcon,
  ArrowLeftIcon,
  SearchIcon,
  PackageIcon,
  TagsIcon,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  const title = "Halaman Tidak Ditemukan"
  const description =
    "Maaf, kami tidak dapat menemukan halaman yang Anda cari. Halaman mungkin telah dipindahkan atau URL yang dimasukkan salah."
  const icon = <SearchIcon size={48} className="text-primary" />

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-background animate-in fade-in duration-700">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
        <div className="relative h-32 w-32 rounded-3xl bg-card border border-border/50 shadow-2xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500">
          <span className="text-6xl font-black text-primary drop-shadow-sm select-none">
            404
          </span>
        </div>
      </div>

      <div className="text-center max-w-lg space-y-6">
        <div className="flex flex-col items-center gap-3">
          <div className="p-4 rounded-2xl bg-primary/10 mb-2">{icon}</div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed px-4">
            {description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            asChild
            size="lg"
            className="h-12 px-8 rounded-xl font-semibold shadow-lg shadow-primary/20 group"
          >
            <Link href="/pos" className="flex items-center gap-2">
              <HomeIcon
                size={18}
                className="group-hover:-translate-y-0.5 transition-transform"
              />
              Ke Dashboard
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="h-12 px-8 rounded-xl font-semibold border-border/50 hover:bg-card"
            onClick={() => router.back()}
          >
            <ArrowLeftIcon size={18} />
            Kembali
          </Button>
        </div>

        <div className="pt-12 grid grid-cols-2 gap-4">
          <Link
            href="/products"
            className="p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-colors text-left group"
          >
            <PackageIcon
              size={20}
              className="mb-2 text-muted-foreground group-hover:text-primary transition-colors"
            />
            <h4 className="font-bold text-sm">Lihat Produk</h4>
            <p className="text-xs text-muted-foreground">
              Cek daftar semua produk
            </p>
          </Link>
          <Link
            href="/categories"
            className="p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-colors text-left group"
          >
            <TagsIcon
              size={20}
              className="mb-2 text-muted-foreground group-hover:text-primary transition-colors"
            />
            <h4 className="font-bold text-sm">Lihat Kategori</h4>
            <p className="text-xs text-muted-foreground">
              Kelola kategori stok
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
