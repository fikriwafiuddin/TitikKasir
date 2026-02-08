import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts"

const CATEGORY_DATA = [
  { name: "Minuman", value: 45 },
  { name: "Makanan", value: 30 },
  { name: "Snack", value: 15 },
  { name: "Peralatan", value: 10 },
]

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"]

function SalesChartByCategory() {
  return (
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
  )
}

export default SalesChartByCategory
