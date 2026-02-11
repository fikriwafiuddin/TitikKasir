"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { STATUS_ORDER } from "@/constants"
import { translateStatus } from "@/lib/utils"
import { SearchIcon } from "lucide-react"
import DatePicker from "@/components/DatePicker"

const MONTHS = [
  { label: "Januari", value: "01" },
  { label: "Februari", value: "02" },
  { label: "Maret", value: "03" },
  { label: "April", value: "04" },
  { label: "Mei", value: "05" },
  { label: "Juni", value: "06" },
  { label: "Juli", value: "07" },
  { label: "Agustus", value: "08" },
  { label: "September", value: "09" },
  { label: "Oktober", value: "10" },
  { label: "November", value: "11" },
  { label: "Desember", value: "12" },
]

const YEARS = Array.from({ length: 5 }, (_, i) =>
  (new Date().getFullYear() - i).toString(),
)

function FiltersSection() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const search = searchParams.get("search") || ""

  const date = search ? "" : searchParams.get("date") || ""
  const month =
    date || search
      ? ""
      : searchParams.get("month") ||
        (new Date().getMonth() + 1).toString().padStart(2, "0")
  const year =
    date || search
      ? ""
      : searchParams.get("year") || new Date().getFullYear().toString()
  const status = searchParams.get("status") || "none"

  const handleSearchChange = (value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set("search", value)
    } else {
      params.delete("search")
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  const handleMonthChange = (value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set("month", value)
      params.delete("date") // Hapus date jika month dipilih
    } else {
      params.delete("month")
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  const handleYearChange = (value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set("year", value)
      params.delete("date") // Hapus date jika year dipilih
    } else {
      params.delete("year")
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  const handleDateChange = (value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set("date", value)
      params.delete("month") // Hapus month dan year jika date dipilih
      params.delete("year")
    } else {
      params.delete("date")
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value !== "none") {
      params.set("status", value)
    } else {
      params.delete("status")
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="">
        <div className="relative flex-1 max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cari ID Pesanan..."
            className="pl-10 h-11 bg-card rounded-xl border-border/50"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <p className="pl-2 text-muted-foreground text-xs italic">
          Minimal 3 karakter untuk mencari
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-2xl">
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

        <div className="relative">
          <DatePicker
            value={date ? new Date(date) : undefined}
            onChange={(date) =>
              handleDateChange(date?.toISOString().split("T")[0] || "")
            }
          />
        </div>
        <Select
          defaultValue="none"
          value={status}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="h-10 w-full rounded-xl bg-card border-border/50">
            <SelectValue placeholder="Pilih Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Semua Status</SelectItem>
            {STATUS_ORDER.map((status) => (
              <SelectItem key={status} value={status}>
                {translateStatus(status)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default FiltersSection
