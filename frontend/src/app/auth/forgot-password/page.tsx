"use client"

import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Store, ShieldQuestionIcon } from "lucide-react"
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm"
import Image from "next/image"

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen animate-in fade-in duration-500">
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
            <CardHeader className="space-y-2 p-0 pb-8">
              <CardTitle className="text-4xl font-extrabold tracking-tight">
                Lupa Password?
              </CardTitle>
              <CardDescription className="text-base font-medium">
                Jangan khawatir! Masukkan email Anda dan kami akan mengirimkan
                link untuk mengatur ulang password Anda.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ForgotPasswordForm />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side: Branding (Visible on lg+) */}
      <div className="hidden lg:flex flex-1 flex-col justify-between bg-primary p-12 text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl" />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-12 group">
            <div className="size-10 relative group-hover:scale-110 transition-transform">
              <Image src="/logo.png" alt="Logo" fill />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              TitikKasir
            </span>
          </Link>

          <div className="max-w-md space-y-6">
            <h2 className="text-4xl font-extrabold leading-tight">
              Keamanan Akun Anda Adalah Prioritas Kami.
            </h2>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Kami menggunakan teknologi enkripsi terkini untuk memastikan data
              dan akses akun Anda tetap aman setiap saat.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-8">
          <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <ShieldQuestionIcon size={24} />
            </div>
            <h3 className="font-bold text-lg">Pemulihan Mudah</h3>
            <p className="text-sm text-primary-foreground/70">
              Proses pemulihan akun yang cepat dan aman via email.
            </p>
          </div>
          <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Store size={24} />
            </div>
            <h3 className="font-bold text-lg">Selalu Terhubung</h3>
            <p className="text-sm text-primary-foreground/70">
              Kembali kelola bisnis Anda dalam hitungan menit.
            </p>
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-white/10 text-sm text-primary-foreground/60">
          © 2026 TitikKasir Software House. Trusted digital cashier solution.
        </div>
      </div>
    </div>
  )
}
