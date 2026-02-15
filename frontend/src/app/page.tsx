import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Store,
  BarChart3,
  Zap,
  ShieldCheck,
  LayoutDashboard,
  Smartphone,
} from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import Image from "next/image"

export default async function Home() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 relative">
              <Image src="/logo.png" alt="Logo" fill />
            </div>
            <span className="text-xl font-bold tracking-tight">TitikKasir</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link
              href="#features"
              className="hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="hover:text-primary transition-colors"
            >
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {user ? (
              <Button asChild>
                <Link href="/pos">Masuk ke aplikasi</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 overflow-hidden bg-linear-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 max-w-2xl">
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                  <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
                  Baru: TitikKasir v1.0 Siap Digunakan
                </div>
                <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
                  Kelola Bisnis Jadi Lebih{" "}
                  <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-indigo-600">
                    Mudah & Cepat
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Solusi kasir pintar untuk segala jenis usaha. Dari manajemen
                  stok hingga laporan keuangan, semua dalam satu genggaman.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {user ? (
                    <Button size="lg" className="h-14 px-8 text-lg" asChild>
                      <Link href="/pos">Masuk ke aplikasi</Link>
                    </Button>
                  ) : (
                    <>
                      <Button
                        size="lg"
                        className="h-14 px-8 text-lg gap-2"
                        asChild
                      >
                        <Link href="/auth/register">
                          Mulai Sekarang <ArrowRight size={20} />
                        </Link>
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="h-14 px-8 text-lg"
                        asChild
                      >
                        <Link href="#features">Lihat Fitur</Link>
                      </Button>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-primary" />
                    Secure SSL
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap size={18} className="text-primary" />
                    Fast Processing
                  </div>
                </div>
              </div>
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px] aspect-square rounded-3xl bg-primary/10 overflow-hidden border shadow-2xl">
                  {/* Placeholder for Hero Image - In a real app we'd use a real dashboard screenshot */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <LayoutDashboard size={200} className="text-primary/20" />
                  </div>
                  <div className="absolute bottom-10 left-10 right-10 bg-background/90 backdrop-blur-sm p-6 rounded-2xl border shadow-lg animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm font-semibold">
                        Today&apos;s Sales
                      </div>
                      <div className="text-emerald-500 font-bold bg-emerald-50 px-2 py-0.5 rounded text-xs">
                        +24%
                      </div>
                    </div>
                    <div className="text-3xl font-bold">Rp 4.250.000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Semua yang Anda Butuhkan untuk Sukses
              </h2>
              <p className="text-lg text-muted-foreground">
                TitikKasir dirancang dengan fokus pada kecepatan dan kemudahan
                penggunaan.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="text-primary" />,
                  title: "Point of Sale (POS)",
                  desc: "Transaksi cepat dengan antarmuka yang intuitif dan responsif.",
                },
                {
                  icon: <Store className="text-primary" />,
                  title: "Manajemen Stok",
                  desc: "Pantau inventaris Anda secara real-time dan dapatkan notifikasi stok rendah.",
                },
                {
                  icon: <BarChart3 className="text-primary" />,
                  title: "Laporan Lengkap",
                  desc: "Analisis penjualan harian, mingguan, hingga bulanan dengan grafik interaktif.",
                },
                {
                  icon: <LayoutDashboard className="text-primary" />,
                  title: "Laporan Real-time",
                  desc: "Pantau performa bisnis Anda kapan saja dengan laporan yang selalu terupdate.",
                },
                {
                  icon: <Smartphone className="text-primary" />,
                  title: "Desain Responsif",
                  desc: "Akses aplikasi dengan nyaman dari perangkat apa saja (Desktop, Tablet, atau HP).",
                },
                {
                  icon: <ShieldCheck className="text-primary" />,
                  title: "Data Terenkripsi",
                  desc: "Keamanan data Anda adalah prioritas kami dengan teknologi enkripsi modern.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl border bg-card hover:shadow-lg transition-shadow border-primary/10 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="bg-primary rounded-[3rem] p-12 lg:p-20 text-center text-primary-foreground relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

              <div className="relative z-10 space-y-8">
                <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                  Siap untuk Menumbuhkan Bisnis Anda?
                </h2>
                <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
                  Mulailah perjalanan digital bisnis Anda sekarang. Kelola
                  transaksi dan stok jadi lebih profesional dengan TitikKasir.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="h-14 px-10 text-lg"
                    asChild
                  >
                    <Link href="/auth/register">Daftar Sekarang</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-10 text-lg bg-transparent border-primary-foreground/20 hover:bg-white/10 text-primary-foreground"
                    asChild
                  >
                    <Link href="#features">Pelajari Selengkapnya</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="size-6 relative">
                <Image src="/logo.png" alt="Logo" fill />
              </div>
              <span className="font-bold tracking-tight">TitikKasir</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 TitikKasir. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm font-medium text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
