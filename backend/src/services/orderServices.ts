import orderRepository from "../repositories/orderRepository.js"
import { ErrorResponse } from "../utils/response.js"
import prisma from "../lib/prisma.js"

const create = async (userId: string, data: any) => {
  const result = await prisma.$transaction(async (tx) => {
    // 1. Get user for latest_order_id
    const user = await tx.user.findUnique({
      where: { user_id: userId },
    })

    if (!user) {
      throw new ErrorResponse("User not found", 404)
    }

    // 2. Generate Order ID
    const latestOrderId = user.latest_order_id
    let nextNumber = 1
    if (latestOrderId) {
      const lastNumberMatch = latestOrderId.match(/-(\d+)$/)
      const lastNumber = lastNumberMatch ? parseInt(lastNumberMatch[1], 10) : 0
      nextNumber = lastNumber + 1
    }
    const nextOrderId = `TR-${nextNumber.toString().padStart(6, "0")}`

    // 3. Create Order and items
    const order = await tx.order.create({
      data: {
        order_id: nextOrderId,
        user_id: userId,
        total_amount: data.total_amount,
        order_items: {
          create: data.items.map((item: any) => ({
            user_id: userId,
            product_id: item.product_id,
            product_name: item.product_name,
            unit_price: item.unit_price,
            sub_total: item.sub_total,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        order_items: true,
      },
    })

    // 4. Update product stock
    for (const item of data.items) {
      const product = await tx.product.findFirst({
        where: {
          id: item.product_id,
          user_id: userId,
        },
      })

      if (!product) {
        throw new ErrorResponse(`Product not found: ${item.product_name}`, 404)
      }

      if (product.stock < item.quantity) {
        throw new ErrorResponse(
          `Insufficient stock for product: ${item.product_name}. Available: ${product.stock}`,
          400,
        )
      }

      await tx.product.update({
        where: { id: item.product_id },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      })
    }

    // 5. Update user latest_order_id
    await tx.user.update({
      where: { user_id: userId },
      data: {
        latest_order_id: nextOrderId,
      },
    })

    return order
  })

  // Format response for Receipt component
  return {
    id: result.id,
    orderId: result.order_id,
    totalAmount: result.total_amount,
    date: result.date.toISOString(),
    status: "success",
    items: result.order_items.map((item) => ({
      id: item.id,
      productId: item.product_id,
      productName: item.product_name,
      quantity: item.quantity,
      price: item.unit_price,
      subtotal: item.sub_total,
    })),
  }
}

const getAll = async (
  userId: string,
  params: {
    page: number
    limit: number
    search?: string
    status?: string
    date?: string
    month?: string
    year?: string
  },
) => {
  const { page, limit, search, status, date, month, year } = params
  const skip = (page - 1) * limit

  const where: any = {
    user_id: userId,
  }

  if (search) {
    if (search.length >= 3) {
      where.order_id = {
        contains: search,
        mode: "insensitive",
      }
    }
  } else if (date) {
    const startDate = new Date(date)
    startDate.setHours(0, 0, 0, 0)
    const endDate = new Date(date)
    where.order_id = {
      contains: search,
      mode: "insensitive",
    }
  }

  if (status) {
    where.status = status
  }

  // Handle Date Filtering
  if (date) {
    const start = new Date(date)
    start.setHours(0, 0, 0, 0)
    const end = new Date(date)
    end.setHours(23, 59, 59, 999)

    where.date = {
      gte: start,
      lte: end,
    }
  } else if (month && year) {
    const start = new Date(parseInt(year), parseInt(month) - 1, 1)
    const end = new Date(parseInt(year), parseInt(month), 0)
    end.setHours(23, 59, 59, 999)

    where.date = {
      gte: start,
      lte: end,
    }
  } else if (year) {
    const start = new Date(parseInt(year), 0, 1)
    const end = new Date(parseInt(year), 11, 31)
    end.setHours(23, 59, 59, 999)

    where.date = {
      gte: start,
      lte: end,
    }
  }

  const [orders, totalItems] = await Promise.all([
    orderRepository.findAll(where, skip, limit),
    orderRepository.count(where),
  ])

  const formattedOrders = orders.map((order: any) => ({
    id: order.id,
    orderId: order.order_id,
    totalAmount: order.total_amount,
    date: order.date.toISOString(),
    status: order.status,
    items: order.order_items.map((item: any) => ({
      id: item.id,
      productId: item.product_id,
      productName: item.product_name,
      quantity: item.quantity,
      price: item.unit_price,
      subtotal: item.sub_total,
    })),
  }))

  return {
    orders: formattedOrders,
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
  }
}

const findByOrderId = async (userId: string, orderId: string) => {
  const order = await orderRepository.findByOrderId(userId, orderId)
  if (!order) {
    throw new ErrorResponse("Order not found", 404)
  }
  return order
}

const updateStatus = async (
  userId: string,
  orderId: string,
  status: string,
) => {
  const order = await findByOrderId(userId, orderId)

  if (order.status === status) {
    return order
  }

  return await prisma.$transaction(async (tx) => {
    // If cancelling, revert stock
    if (status === "CANCELLED" && order.status !== "CANCELLED") {
      for (const item of order.order_items) {
        await tx.product.update({
          where: { id: item.product_id },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        })
      }
    }

    // If changing from CANCELLED back to SUCCESS, decrement stock
    if (status === "SUCCESS" && order.status === "CANCELLED") {
      for (const item of order.order_items) {
        const product = await tx.product.findUnique({
          where: { id: item.product_id },
        })

        if (!product || product.stock < item.quantity) {
          throw new ErrorResponse(
            `Insufficient stock to restore order: ${item.product_name}`,
            400,
          )
        }

        await tx.product.update({
          where: { id: item.product_id },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        })
      }
    }

    const updatedOrder = await tx.order.update({
      where: { order_id: orderId },
      data: { status },
      include: {
        order_items: true,
      },
    })

    return {
      id: updatedOrder.id,
      orderId: updatedOrder.order_id,
      totalAmount: updatedOrder.total_amount,
      date: updatedOrder.date.toISOString(),
      status: updatedOrder.status,
      items: updatedOrder.order_items.map((item) => ({
        id: item.id,
        productId: item.product_id,
        productName: item.product_name,
        quantity: item.quantity,
        price: item.unit_price,
        subtotal: item.sub_total,
      })),
    }
  })
}

const orderServices = {
  create,
  getAll,
  details: findByOrderId,
  updateStatus,
}

export default orderServices
