"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function CategoryFormSkeleton() {
  return (
    <Card className="rounded-xl border-border/50">
      <CardContent className="p-6">
        <div className="grid gap-4 py-6">
          {/* Name Input Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        </div>

        {/* Submit Button Skeleton */}
        <Skeleton className="h-11 w-full rounded-xl" />
      </CardContent>
    </Card>
  )
}
