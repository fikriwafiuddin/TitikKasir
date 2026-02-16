"use client"

import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { KeyRoundIcon, LockIcon } from "lucide-react"
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm"
import Image from "next/image"

export default function ResetPasswordPage() {
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
                Atur Ulang Password
              </CardTitle>
              <CardDescription className="text-base font-medium">
                Silakan buat password baru yang kuat untuk mengamankan kembali
                akun Anda.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ResetPasswordForm />
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
              Berikan Perlindungan Terbaik untuk Bisnis Anda.
            </h2>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Gunakan kombinasi password yang unik antara huruf, angka, dan
              simbol untuk keamanan maksimal.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-8">
          <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <LockIcon size={24} />
            </div>
            <h3 className="font-bold text-lg">Enkripsi Kuat</h3>
            <p className="text-sm text-primary-foreground/70">
              Password Anda dienkripsi secara aman di server kami.
            </p>
          </div>
          <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <KeyRoundIcon size={24} />
            </div>
            <h3 className="font-bold text-lg">Akses Terkendali</h3>
            <p className="text-sm text-primary-foreground/70">
              Hanya Anda yang memiliki kendali penuh atas akun Anda.
            </p>
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-white/10 text-sm text-primary-foreground/60">
          © 2026 TitikKasir Software House. Secure and professional POS system.
        </div>
      </div>
    </div>
  )
}
