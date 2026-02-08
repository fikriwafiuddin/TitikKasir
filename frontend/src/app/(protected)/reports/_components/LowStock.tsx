import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PackageIcon } from "lucide-react"
import React from "react"

function LowStock() {
  return (
    <Card className="rounded-2xl shadow-sm border-border/50 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-destructive flex items-center gap-2">
          <PackageIcon size={20} />
          Peringatan Stok Menipis
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
                <p className="text-xs text-muted-foreground">{item.category}</p>
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
  )
}

export default LowStock
