import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  DollarSignIcon,
  PackageIcon,
  ShoppingCartIcon,
  TrendingUpIcon,
} from "lucide-react"

import { formatCurrency } from "@/lib/utils"
import { ReportSummary } from "@/types"

interface StatsSectionProps {
  summary?: ReportSummary
}

function StatsSection({ summary }: StatsSectionProps) {
  const stats = [
    {
      title: "Total Pendapatan",
      value: formatCurrency(summary?.revenue.value || 0),
      label: "vs bulan lalu",
      growth: summary?.revenue.growth || 0,
      icon: DollarSignIcon,
      color: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      title: "Jumlah Transaksi",
      value: summary?.transactions.value.toString() || "0",
      label: "vs bulan lalu",
      growth: summary?.transactions.growth || 0,
      icon: ShoppingCartIcon,
      color: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      title: "Produk Terjual",
      value: summary?.quantity.value.toString() || "0",
      label: "vs bulan lalu",
      growth: summary?.quantity.growth || 0,
      icon: PackageIcon,
      color: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
    {
      title: "Pertumbuhan",
      value: `${summary?.overallGrowth || 0}%`,
      label: "vs bulan lalu",
      growth: summary?.overallGrowth || 0,
      icon: TrendingUpIcon,
      color: "bg-purple-500/10",
      iconColor: "text-purple-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <Card
          key={i}
          className="rounded-2xl shadow-sm border-border/50 overflow-hidden group hover:shadow-md transition-shadow"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {stat.title}
            </CardTitle>
            <div
              className={`p-2 ${stat.color} rounded-lg group-hover:scale-110 transition-transform`}
            >
              <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span
                className={`${
                  stat.growth >= 0 ? "text-emerald-500" : "text-destructive"
                } font-bold flex items-center`}
              >
                {stat.growth >= 0 ? (
                  <ArrowUpRightIcon className="h-3 w-3 mr-0.5" />
                ) : (
                  <ArrowDownRightIcon className="h-3 w-3 mr-0.5" />
                )}
                {stat.growth >= 0 ? "+" : ""}
                {stat.growth}%
              </span>
              {stat.label}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default StatsSection
