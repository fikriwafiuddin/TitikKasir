"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "./ui/button"

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export default function ErrorState({
  title = "Terjadi Kesalahan",
  message = "Gagal memuat data. Periksa koneksi internet Anda dan coba lagi.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-destructive/20 bg-destructive/5 p-8 text-center animate-in fade-in duration-500">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle size={32} />
      </div>
      <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mb-6 max-w-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="gap-2 rounded-xl border-destructive/20 hover:bg-destructive/10 hover:text-destructive"
        >
          <RefreshCw size={16} />
          Coba Lagi
        </Button>
      )}
    </div>
  )
}
