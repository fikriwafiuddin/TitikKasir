"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DollarSign,
  ShoppingCart,
  Package,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Report & Analytics</h1>
        <p className="text-muted-foreground">
          Overview of your business performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 12.450.000</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-emerald-500 font-medium flex items-center">
                <ArrowUpRight className="h-3 w-3" /> +12%
              </span>
              dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sales Count
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-emerald-500 font-medium flex items-center">
                <ArrowUpRight className="h-3 w-3" /> +8.2%
              </span>
              dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Products Sold
            </CardTitle>
            <Package className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">384</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-destructive font-medium flex items-center">
                <ArrowDownRight className="h-3 w-3" /> -2.4%
              </span>
              dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Growth Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+18.5%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-emerald-500 font-medium flex items-center">
                <ArrowUpRight className="h-3 w-3" /> +4.1%
              </span>
              dari bulan lalu
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Kopi Susu Gula Aren",
                  sales: 85,
                  revenue: "Rp 1.530.000",
                },
                { name: "Cafe Latte", sales: 62, revenue: "Rp 1.364.000" },
                {
                  name: "Croissant Original",
                  sales: 48,
                  revenue: "Rp 720.000",
                },
                { name: "Matcha Latte", sales: 36, revenue: "Rp 864.000" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{item.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.sales} terjual
                    </span>
                  </div>
                  <span className="font-semibold text-sm">{item.revenue}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-balance">
              <p>
                • Transaksi <strong>ORD-005</strong> selesai sebesar Rp 60.000
              </p>
              <p>
                • Stok <strong>Muffin Blueberry</strong> menipis (sisa 2)
              </p>
              <p>
                • Kategori baru <strong>Merchandise</strong> ditambahkan
              </p>
              <p>• Laporan mingguan dikirim ke email</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
