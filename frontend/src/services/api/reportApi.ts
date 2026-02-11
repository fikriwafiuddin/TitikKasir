import api from "@/lib/axios"
import { ReportData, ApiResponse } from "@/types"

const getSummary = async (
  month?: string,
  year?: string,
): Promise<ApiResponse<ReportData>> => {
  const response = await api.get("/reports", {
    params: { month, year },
  })
  return response.data
}

const reportApi = {
  getSummary,
}

export default reportApi
