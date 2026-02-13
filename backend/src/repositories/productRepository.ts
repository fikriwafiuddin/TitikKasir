import prisma from "../lib/prisma.js"

const findAll = async (where: any, skip: number, take: number) => {
  return await prisma.product.findMany({
    where,
    skip,
    take,
    orderBy: {
      id: "desc",
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  })
}

const count = async (where: any) => {
  return await prisma.product.count({ where })
}

const findById = async (userId: string, id: number) => {
  return await prisma.product.findFirst({
    where: {
      user_id: userId,
      id,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  })
}

const findByName = async (userId: string, name: string) => {
  return await prisma.product.findFirst({
    where: {
      user_id: userId,
      name,
    },
  })
}

const create = async (data: any) => {
  return await prisma.product.create({
    data,
  })
}

const update = async (id: number, data: any) => {
  return await prisma.product.update({
    where: { id },
    data,
  })
}

const deleteById = async (id: number) => {
  return await prisma.product.delete({
    where: { id },
  })
}

const productRepository = {
  findAll,
  count,
  findById,
  findByName,
  create,
  update,
  deleteById,
}

export default productRepository
