"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  DollarSign,
  ShoppingCart,
  Package,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell,
  PieChart,
  Pie,
} from "recharts"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const SALES_DATA = [
  { name: "Mon", sales: 4200000 },
  { name: "Tue", sales: 3800000 },
  { name: "Wed", sales: 5100000 },
  { name: "Thu", sales: 4800000 },
  { name: "Fri", sales: 6200000 },
  { name: "Sat", sales: 8500000 },
  { name: "Sun", sales: 7200000 },
]

const CATEGORY_DATA = [
  { name: "Minuman", value: 45 },
  { name: "Makanan", value: 30 },
  { name: "Snack", value: 15 },
  { name: "Peralatan", value: 10 },
]

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"]

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Report & Analytics
          </h1>
          <p className="text-muted-foreground text-sm">
            Overview of your business performance.
          </p>
        </div>
        <Button
          variant="outline"
          className="gap-2 rounded-xl h-10 border-border/50"
        >
          <Calendar size={18} />
          <span>Last 7 Days</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl shadow-sm border-border/50 overflow-hidden group hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Total Revenue
            </CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 12.450k</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-emerald-500 font-bold flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-0.5" /> +12%
              </span>
              vs last month
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm border-border/50 overflow-hidden group hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Sales Count
            </CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-lg group-hover:scale-110 transition-transform">
              <ShoppingCart className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-emerald-500 font-bold flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-0.5" /> +8.2%
              </span>
              vs last month
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm border-border/50 overflow-hidden group hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Products Sold
            </CardTitle>
            <div className="p-2 bg-orange-500/10 rounded-lg group-hover:scale-110 transition-transform">
              <Package className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">384</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-destructive font-bold flex items-center">
                <ArrowDownRight className="h-3 w-3 mr-0.5" /> -2.4%
              </span>
              vs last month
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm border-border/50 overflow-hidden group hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Growth Rate
            </CardTitle>
            <div className="p-2 bg-purple-500/10 rounded-lg group-hover:scale-110 transition-transform">
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+18.5%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-emerald-500 font-bold flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-0.5" /> +4.1%
              </span>
              vs last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 rounded-2xl shadow-sm border-border/50 overflow-hidden">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Daily sales revenue for the current week.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={SALES_DATA}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    tickFormatter={(value) => `Rp ${value / 1000000}M`}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                    formatter={(value: number) => [
                      `Rp ${value.toLocaleString("id-ID")}`,
                      "Revenue",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorSales)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm border-border/50 overflow-hidden">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>
              Product distribution across categories.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {CATEGORY_DATA.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-4">
                <div className="text-center">
                  <span className="text-2xl font-bold">142</span>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                    Total Sales
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs">
              {CATEGORY_DATA.map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: COLORS[i] }}
                  />
                  <span className="text-muted-foreground font-medium">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <Card className="rounded-2xl shadow-sm border-border/50 overflow-hidden">
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
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                      #{i + 1}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">{item.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.sales} terjual
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-sm text-primary">
                    {item.revenue}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm border-border/50 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <Package size={20} />
              Low Stock Warning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Muffin Blueberry", stock: 2, category: "Makanan" },
                { name: "Sandwich Tuna", stock: 1, category: "Makanan" },
                { name: "Espresso Beans", stock: 5, category: "Bahan" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-destructive/5 border border-destructive/10"
                >
                  <div>
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-destructive">
                      {item.stock}
                    </p>
                    <p className="text-[10px] font-bold text-destructive/60 uppercase">
                      Left
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
