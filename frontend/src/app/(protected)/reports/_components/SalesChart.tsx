import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const SALES_DATA = [
  { date: "01", sales: 4200000 },
  { date: "02", sales: 38000 },
  { date: "03", sales: 5100000 },
  { date: "04", sales: 4800000 },
  { date: "05", sales: 6200000 },
  { date: "06", sales: 8500000 },
  { date: "07", sales: 7200000 },
  { date: "08", sales: 5800000 },
  { date: "09", sales: 6500000 },
  { date: "10", sales: 7000000 },
  { date: "11", sales: 6800000 },
  { date: "12", sales: 7500000 },
  { date: "13", sales: 8000000 },
  { date: "14", sales: 7800000 },
  { date: "15", sales: 8200000 },
  { date: "16", sales: 7600000 },
  { date: "17", sales: 6900000 },
  { date: "18", sales: 7400000 },
  { date: "19", sales: 8100000 },
  { date: "20", sales: 7900000 },
  { date: "21", sales: 8300000 },
  { date: "22", sales: 7700000 },
  { date: "23", sales: 6700000 },
  { date: "24", sales: 7300000 },
  { date: "25", sales: 8400000 },
  { date: "26", sales: 7100000 },
  { date: "27", sales: 6600000 },
  { date: "28", sales: 7600000 },
]

function SalesChart() {
  return (
    <Card className="rounded-2xl shadow-sm border-border/50 overflow-hidden">
      <CardHeader>
        <CardTitle>Gambaran Umum Pendapatan</CardTitle>
        <CardDescription>Penjualan bulan ini.</CardDescription>
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
                dataKey="date"
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
  )
}

export default SalesChart
