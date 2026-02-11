export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export const STATUS_ORDER = ["SUCCESS", "CANCELLED"]

export const MONTHS = [
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

export const YEARS = Array.from({ length: 5 }, (_, i) =>
  (new Date().getFullYear() - i).toString(),
)
