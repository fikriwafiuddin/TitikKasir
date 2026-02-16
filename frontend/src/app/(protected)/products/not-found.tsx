"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PackageIcon } from "lucide-react"

export default function ProductNotFound() {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center p-6 bg-background animate-in fade-in duration-700">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
        <div className="relative h-32 w-32 rounded-3xl bg-card border border-border/50 shadow-2xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500">
          <PackageIcon size={64} className="text-primary" />
        </div>
      </div>

      <div className="text-center max-w-lg space-y-6">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
            Produk Tidak Ditemukan
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed px-4">
            Maaf, kami tidak dapat menemukan produk yang Anda cari. Produk
            mungkin telah dihapus atau ID yang dimasukkan tidak valid.
          </p>
        </div>

        <div className="flex justify-center pt-4">
          <Button
            asChild
            size="lg"
            className="h-12 px-8 rounded-xl font-semibold shadow-lg shadow-primary/20 group"
          >
            <Link href="/products" className="flex items-center gap-2">
              <PackageIcon
                size={18}
                className="group-hover:-translate-y-0.5 transition-transform"
              />
              Ke Daftar Produk
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
