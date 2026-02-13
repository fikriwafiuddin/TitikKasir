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
import { BarChart3, LayoutDashboard } from "lucide-react"

import { RegisterForm } from "@/components/auth/RegisterForm"
import GoogleLogin from "@/components/auth/GoogleLogin"
import Image from "next/image"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen">
      {/* Right Side: Branding (Visible on lg+) - Moved to left for variation or kept same for consistency? 
          Docs say "When the user is using a wide screen, display an image or something interesting". 
          Let's keep branding on the right for consistency with Login. */}

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
                Buat Akun Baru
              </CardTitle>
              <CardDescription className="text-base">
                Mulai kelola bisnis Anda lebih profesional hari ini.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <RegisterForm />
            </CardContent>
            <CardFooter className="flex flex-col space-y-6 p-0 pt-8">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Atau daftar dengan
                  </span>
                </div>
              </div>
              <GoogleLogin />
              <div className="text-sm text-center text-muted-foreground">
                Sudah punya akun?{" "}
                <Link
                  href="/auth/login"
                  className="text-primary hover:underline font-semibold"
                >
                  Masuk Saja
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
              Satu Platform untuk Semua Kebutuhan Bisnis Anda.
            </h2>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Bergabunglah dengan komunitas pengusaha sukses dan mulai
              transformasi digital bisnis Anda hari ini bersama TitikKasir.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg">Analitik Akurat</h3>
            <p className="text-sm text-primary-foreground/70">
              Dapatkan insight mendalam tentang performa penjualan Anda.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <LayoutDashboard className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg">Dashboard Intuitif</h3>
            <p className="text-sm text-primary-foreground/70">
              Kelola semua fitur dari satu tempat yang mudah dipahami.
            </p>
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-white/10 text-sm text-primary-foreground/60">
          Platform POS modern dengan fitur terlengkap untuk UMKM.
        </div>
      </div>
    </div>
  )
}
