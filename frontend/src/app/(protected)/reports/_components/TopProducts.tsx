import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import React from "react"

function TopProducts() {
  return (
    <Card className="rounded-2xl shadow-sm border-border/50 overflow-hidden">
      <CardHeader>
        <CardTitle>Produk Terlaris</CardTitle>
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
  )
}

export default TopProducts
