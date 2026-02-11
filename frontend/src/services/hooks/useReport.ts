import { useQuery } from "@tanstack/react-query"
import reportApi from "../api/reportApi"

export function useReport(month?: string, year?: string) {
  return useQuery({
    queryKey: ["reports", { month, year }],
    queryFn: () => reportApi.getSummary(month, year),
  })
}
