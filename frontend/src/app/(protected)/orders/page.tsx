"use client"

import columns from "./_components/columns"
import DataTable from "@/components/DataTable"
import AppPagination from "@/components/AppPagination"
import FiltersSection from "./_components/FiltersSection"
import { useOrders } from "@/services/hooks/useOrder"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

export default function OrdersPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pageParam = searchParams.get("page")
  const page = pageParam ? parseInt(pageParam) : 1

  const search = searchParams.get("search") || undefined
  const statusParam = searchParams.get("status")
  const status = statusParam && statusParam !== "none" ? statusParam : undefined

  const date = searchParams.get("date") || undefined
  const month = searchParams.get("month") || undefined
  const year = searchParams.get("year") || undefined

  const { data, isLoading } = useOrders({
    page,
    limit: 10,
    search,
    status,
    date,
    month,
    year,
  })

  const orders = data?.data?.orders || []
  const meta = data?.meta

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", newPage.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Riwayat Pesanan</h1>
          <p className="text-muted-foreground text-sm">
            Tinjau pesanan Anda sebelumnya dan detail pesanan.
          </p>
        </div>
      </div>

      <FiltersSection />

      <DataTable columns={columns} data={orders} isLoading={isLoading} />

      {meta && meta.total_pages > 1 && (
        <AppPagination
          totalPages={meta.total_pages}
          currentPage={meta.current_page}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}
