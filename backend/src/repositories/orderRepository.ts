import prisma from "@/lib/prisma.js"

const create = async (data: any) => {
  return await prisma.order.create({
    data: {
      order_id: data.order_id,
      user_id: data.user_id,
      total_amount: data.total_amount,
      order_items: {
        create: data.items.map((item: any) => ({
          user_id: data.user_id,
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
}

const findAll = async (where: any, skip: number, take: number) => {
  return await prisma.order.findMany({
    where,
    skip,
    take,
    orderBy: {
      date: "desc",
    },
    include: {
      order_items: true,
    },
  })
}

const count = async (where: any) => {
  return await prisma.order.count({ where })
}

const findByOrderId = async (userId: string, orderId: string) => {
  return await prisma.order.findFirst({
    where: {
      user_id: userId,
      order_id: orderId,
    },
    include: {
      order_items: true,
    },
  })
}

const update = async (orderId: string, data: any) => {
  return await prisma.order.update({
    where: { order_id: orderId },
    data,
    include: {
      order_items: true,
    },
  })
}

const orderRepository = {
  create,
  findAll,
  count,
  findByOrderId,
  update,
}

export default orderRepository
