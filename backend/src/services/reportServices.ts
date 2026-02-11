import prisma from "@/lib/prisma.js"

/**
 * Internal helper to calculate date ranges for current and previous month
 */
const getDateRanges = (month: number, year: number) => {
  const startDate = new Date(year, month - 1, 1)
  const endDate = new Date(year, month, 0)
  endDate.setHours(23, 59, 59, 999)

  const prevMonthStart = new Date(year, month - 2, 1)
  const prevMonthEnd = new Date(year, month - 1, 0)
  prevMonthEnd.setHours(23, 59, 59, 999)

  return { startDate, endDate, prevMonthStart, prevMonthEnd }
}

/**
 * Internal helper to fetch orders within a date range
 */
const fetchOrdersInRange = async (userId: string, start: Date, end: Date) => {
  return await prisma.order.findMany({
    where: {
      user_id: userId,
      status: "SUCCESS",
      date: {
        gte: start,
        lte: end,
      },
    },
    include: {
      order_items: true,
    },
  })
}

/**
 * Internal helper to calculate summary statistics and growth
 */
const calculateSummary = (currentOrders: any[], prevOrders: any[]) => {
  const calculateTotal = (orders: any[]) => ({
    revenue: orders.reduce((sum, o) => sum + o.total_amount, 0),
    transactions: orders.length,
    quantity: orders.reduce(
      (sum, o) =>
        sum +
        o.order_items.reduce(
          (itemSum: number, item: any) => itemSum + item.quantity,
          0,
        ),
      0,
    ),
  })

  const current = calculateTotal(currentOrders)
  const prev = calculateTotal(prevOrders)

  const calculateGrowth = (currValue: number, prevValue: number) => {
    if (prevValue === 0) return currValue > 0 ? 100 : 0
    return parseFloat((((currValue - prevValue) / prevValue) * 100).toFixed(1))
  }

  return {
    revenue: {
      value: current.revenue,
      growth: calculateGrowth(current.revenue, prev.revenue),
    },
    transactions: {
      value: current.transactions,
      growth: calculateGrowth(current.transactions, prev.transactions),
    },
    quantity: {
      value: current.quantity,
      growth: calculateGrowth(current.quantity, prev.quantity),
    },
    overallGrowth: calculateGrowth(current.revenue, prev.revenue),
  }
}

/**
 * Internal helper to calculate daily sales for chart
 */
const calculateDailySales = (orders: any[], daysInMonth: number) => {
  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = (i + 1).toString().padStart(2, "0")
    const daySales = orders
      .filter((o) => o.date.getDate() === i + 1)
      .reduce((sum, o) => sum + o.total_amount, 0)
    return { date: day, sales: daySales }
  })
}

/**
 * Internal helper to identify top selling products
 */
const calculateTopProducts = (orders: any[], limit = 5) => {
  const productSalesMap = new Map<
    number,
    { name: string; quantity: number; revenue: number }
  >()

  orders.forEach((order) => {
    order.order_items.forEach((item: any) => {
      const existing = productSalesMap.get(item.product_id) || {
        name: item.product_name,
        quantity: 0,
        revenue: 0,
      }
      existing.quantity += item.quantity
      existing.revenue += item.sub_total
      productSalesMap.set(item.product_id, existing)
    })
  })

  return Array.from(productSalesMap.values())
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, limit)
}

/**
 * Internal helper to fetch low stock products
 */
const fetchLowStockProducts = async (userId: string, threshold = 5) => {
  const products = await prisma.product.findMany({
    where: {
      user_id: userId,
      stock: {
        lte: threshold,
      },
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      stock: "asc",
    },
  })

  return products.map((p) => ({
    name: p.name,
    stock: p.stock,
    category: p.category.name,
  }))
}

/**
 * Orchestrator function for getting the full report
 */
const getReport = async (userId: string, month: string, year: string) => {
  const { startDate, endDate, prevMonthStart, prevMonthEnd } = getDateRanges(
    parseInt(month),
    parseInt(year),
  )

  const [currentOrders, prevOrders, lowStock] = await Promise.all([
    fetchOrdersInRange(userId, startDate, endDate),
    fetchOrdersInRange(userId, prevMonthStart, prevMonthEnd),
    fetchLowStockProducts(userId),
  ])

  return {
    summary: calculateSummary(currentOrders, prevOrders),
    dailySales: calculateDailySales(currentOrders, endDate.getDate()),
    topProducts: calculateTopProducts(currentOrders),
    lowStock,
  }
}

const reportServices = {
  getReport,
}

export default reportServices
