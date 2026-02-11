import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { TopProduct } from "@/types"
import React from "react"

interface TopProductsProps {
  data?: TopProduct[]
}

function TopProducts({ data }: TopProductsProps) {
  return (
    <Card className="rounded-2xl shadow-sm border-border/50 overflow-hidden">
      <CardHeader>
        <CardTitle>Produk Terlaris</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data?.map((item, i) => (
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
                    {item.quantity} terjual
                  </span>
                </div>
              </div>
              <span className="font-bold text-sm text-primary">
                {formatCurrency(item.revenue)}
              </span>
            </div>
          ))}
          {(!data || data.length === 0) && (
            <p className="text-center text-muted-foreground py-10">
              Tidak ada data penjualan
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default TopProducts
