"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
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
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-2xl">
                T
              </span>
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
              <Button
                variant="outline"
                className="w-full h-12 gap-2"
                type="button"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <div className="text-sm text-center text-muted-foreground">
                Sudah punya akun?{" "}
                <Link
                  href="/login"
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
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-2xl">T</span>
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
