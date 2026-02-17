import prisma from "../lib/prisma.js"

const findAll = async (where: any, skip: number, take: number) => {
  return await prisma.category.findMany({
    where: { ...where, is_active: true },
    skip,
    take,
    orderBy: {
      id: "desc",
    },
  })
}

const count = async (where: any) => {
  return await prisma.category.count({
    where: { ...where, is_active: true },
  })
}

const findById = async (userId: string, id: number) => {
  return await prisma.category.findFirst({
    where: {
      user_id: userId,
      id,
      is_active: true,
    },
  })
}

const findByName = async (userId: string, name: string) => {
  return await prisma.category.findFirst({
    where: {
      user_id: userId,
      name,
      is_active: true,
    },
  })
}

const findBySkuPrefix = async (userId: string, skuPrefix: string) => {
  return await prisma.category.findFirst({
    where: {
      user_id: userId,
      sku_prefix: skuPrefix,
    },
  })
}

const create = async (data: any) => {
  return await prisma.category.create({
    data,
  })
}

const update = async (id: number, data: any) => {
  return await prisma.category.update({
    where: { id },
    data,
  })
}

const deleteById = async (id: number) => {
  return await prisma.category.delete({
    where: { id },
  })
}

const categoryRepository = {
  findAll,
  count,
  findById,
  findByName,
  findBySkuPrefix,
  create,
  update,
  deleteById,
}

export default categoryRepository
