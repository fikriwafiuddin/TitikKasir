"use client"

import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Store, Zap } from "lucide-react"

import { LoginForm } from "@/components/auth/LoginForm"
import GoogleLogin from "@/components/auth/GoogleLogin"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side: Form */}
      <div className="flex flex-1 items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center gap-2 lg:hidden mb-8">
            <div className="size-10 relative">
              <Image src="/logo.png" alt="Logo" fill />
            </div>
            <span className="text-2xl font-bold tracking-tight text-primary">
              TitikKasir
            </span>
          </div>

          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="space-y-1 p-0 pb-8">
              <CardTitle className="text-3xl font-bold tracking-tight">
                Login ke Akun Anda
              </CardTitle>
              <CardDescription className="text-base">
                Masukkan email dan password Anda untuk masuk
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <LoginForm />
            </CardContent>
            <CardFooter className="flex flex-col space-y-6 p-0 pt-8">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Atau lanjut dengan
                  </span>
                </div>
              </div>
              <GoogleLogin />
              <div className="text-sm text-center text-muted-foreground">
                Belum punya akun?{" "}
                <Link
                  href="/auth/register"
                  className="text-primary hover:underline font-semibold"
                >
                  Daftar Sekarang
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Right Side: Branding (Visible on lg+) */}
      <div className="hidden lg:flex flex-1 flex-col justify-between bg-primary p-12 text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl" />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-12">
            <div className="size-10 relative">
              <Image src="/logo.png" alt="Logo" fill />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              TitikKasir
            </span>
          </Link>

          <div className="max-w-md space-y-6">
            <h2 className="text-4xl font-extrabold leading-tight">
              Tingkatkan Efisiensi Bisnis Anda dalam Hitungan Menit.
            </h2>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              TitikKasir memberikan solusi Point of Sale yang cepat, andal, dan
              mudah digunakan untuk membantu Anda fokus pada pertumbuhan bisnis.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg">Cepat & Responsif</h3>
            <p className="text-sm text-primary-foreground/70">
              Transaksi selesai dalam sekejap tanpa hambatan.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Store className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg">Manajemen Inventaris</h3>
            <p className="text-sm text-primary-foreground/70">
              Pantau stok barang Anda secara real-time.
            </p>
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-white/10 text-sm text-primary-foreground/60">
          © 2026 TitikKasir Software House. Solusi Kasir Digital Modern.
        </div>
      </div>
    </div>
  )
}
