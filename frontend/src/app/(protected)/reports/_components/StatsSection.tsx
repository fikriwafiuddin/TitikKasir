import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  DollarSignIcon,
  PackageIcon,
  ShoppingCartIcon,
  TrendingUpIcon,
} from "lucide-react"

function StatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="rounded-2xl shadow-sm border-border/50 overflow-hidden group hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Total Pendapatan
          </CardTitle>
          <div className="p-2 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform">
            <DollarSignIcon className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Rp 12.450k</div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <span className="text-emerald-500 font-bold flex items-center">
              <ArrowUpRightIcon className="h-3 w-3 mr-0.5" /> +12%
            </span>
            vs bulan lalu
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm border-border/50 overflow-hidden group hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Jumlah Transaksi
          </CardTitle>
          <div className="p-2 bg-blue-500/10 rounded-lg group-hover:scale-110 transition-transform">
            <ShoppingCartIcon className="h-4 w-4 text-blue-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">142</div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <span className="text-emerald-500 font-bold flex items-center">
              <ArrowUpRightIcon className="h-3 w-3 mr-0.5" /> +8.2%
            </span>
            vs bulan lalu
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm border-border/50 overflow-hidden group hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Produk Terjual
          </CardTitle>
          <div className="p-2 bg-orange-500/10 rounded-lg group-hover:scale-110 transition-transform">
            <PackageIcon className="h-4 w-4 text-orange-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">384</div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <span className="text-destructive font-bold flex items-center">
              <ArrowDownRightIcon className="h-3 w-3 mr-0.5" /> -2.4%
            </span>
            vs bulan lalu
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm border-border/50 overflow-hidden group hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Pertumbuhan
          </CardTitle>
          <div className="p-2 bg-purple-500/10 rounded-lg group-hover:scale-110 transition-transform">
            <TrendingUpIcon className="h-4 w-4 text-purple-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+18.5%</div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <span className="text-emerald-500 font-bold flex items-center">
              <ArrowUpRightIcon className="h-3 w-3 mr-0.5" /> +4.1%
            </span>
            vs bulan lalu
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default StatsSection
