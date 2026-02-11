"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function ProductFormSkeleton() {
  return (
    <Card className="rounded-xl border-border/50">
      <CardContent className="p-6">
        <div className="grid gap-4 py-6">
          {/* Image Upload Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-40 w-full rounded-xl" />
          </div>

          {/* Name Input Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>

          {/* Category Select Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>

          {/* Price and Stock Row Skeleton */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          </div>
        </div>

        {/* Submit Button Skeleton */}
        <Skeleton className="h-11 w-full rounded-xl" />
      </CardContent>
    </Card>
  )
}
