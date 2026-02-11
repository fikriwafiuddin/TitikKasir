"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MONTHS, YEARS } from "@/constants"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import TopProducts from "./_components/TopProducts"
import LowStock from "./_components/LowStock"
import StatsSection from "./_components/StatsSection"
import SalesChart from "./_components/SalesChart"

import { useReport } from "@/services/hooks/useReport"
import { ReportsSkeleton } from "./_components/ReportsSkeleton"

export default function ReportsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const month =
    searchParams.get("month") ||
    (new Date().getMonth() + 1).toString().padStart(2, "0")
  const year = searchParams.get("year") || new Date().getFullYear().toString()

  const { data, isLoading } = useReport(month, year)

  const handleMonthChange = (value: string) => {
    router.push(`${pathname}?month=${value}&year=${year}`)
  }

  const handleYearChange = (value: string) => {
    router.push(`${pathname}?month=${month}&year=${value}`)
  }

  const reportData = data?.data

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Laporan & Analisis
            </h1>
            <p className="text-muted-foreground text-sm">
              Gambaran umum kinerja bisnis Anda.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-md">
          <Select value={month} onValueChange={handleMonthChange}>
            <SelectTrigger className="h-10 w-full rounded-xl bg-card border-border/50">
              <SelectValue placeholder="Pilih Bulan" />
            </SelectTrigger>
            <SelectContent>
              {MONTHS.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={year} onValueChange={handleYearChange}>
            <SelectTrigger className="h-10 w-full rounded-xl bg-card border-border/50">
              <SelectValue placeholder="Pilih Tahun" />
            </SelectTrigger>
            <SelectContent>
              {YEARS.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <ReportsSkeleton />
      ) : (
        <>
          <StatsSection summary={reportData?.summary} />

          <SalesChart data={reportData?.dailySales} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <TopProducts data={reportData?.topProducts} />

            <LowStock data={reportData?.lowStock} />
          </div>
        </>
      )}
    </div>
  )
}
