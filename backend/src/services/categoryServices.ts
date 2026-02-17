import categoryRepository from "../repositories/categoryRepository.js"
import { generateUniqueCategorySkuPrefix } from "../helpers/categoryHelper.js"
import { FormCreateCategory } from "../types/form.js"
import { ErrorResponse } from "../utils/response.js"
import prisma from "../lib/prisma.js"

const getAll = async (
  userId: string,
  params: { page: number; limit: number; name?: string },
) => {
  const { page, limit, name } = params
  const skip = (page - 1) * limit

  const where = {
    user_id: userId,
    ...(name && {
      name: {
        contains: name,
        mode: "insensitive" as const,
      },
    }),
  }

  const [categories, totalItems] = await Promise.all([
    categoryRepository.findAll(where, skip, limit),
    categoryRepository.count(where),
  ])

  return {
    categories,
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
  }
}

const create = async (userId: string, data: FormCreateCategory) => {
  const { name } = data

  const categoryExists = await categoryRepository.findByName(userId, name)
  if (categoryExists) {
    throw new ErrorResponse("Category name already exists", 400)
  }

  const skuPrefix = await generateUniqueCategorySkuPrefix(userId, name)

  return await categoryRepository.create({
    user_id: userId,
    name,
    sku_prefix: skuPrefix,
    latest_sku: skuPrefix + "-000",
  })
}

const update = async (userId: string, id: number, data: FormCreateCategory) => {
  const { name } = data
  const category = await categoryRepository.findById(userId, id)
  if (!category) {
    throw new ErrorResponse("Category not found", 404)
  }

  // check name already exists for other categories
  const categoryWithSameName = await categoryRepository.findByName(userId, name)
  if (categoryWithSameName && categoryWithSameName.id !== id) {
    throw new ErrorResponse("Category name already exists", 400)
  }

  return await categoryRepository.update(id, { name })
}

const remove = async (userId: string, id: number) => {
  const category = await prisma.category.findFirst({
    where: { id, user_id: userId },
  })
  if (!category) {
    throw new ErrorResponse("Category not found", 404)
  }

  if (category.total_items > 0) {
    throw new ErrorResponse("Category is not empty", 400)
  }

  // Check if there are ANY products (including soft-deleted) in this category
  const productCount = await prisma.product.count({
    where: { category_id: id },
  })

  if (productCount > 0) {
    // Soft delete category
    return await categoryRepository.update(id, { is_active: false })
  }

  return await categoryRepository.deleteById(id)
}

const detail = async (userId: string, id: number) => {
  const category = await categoryRepository.findById(userId, id)
  if (!category) {
    throw new ErrorResponse("Category not found", 404)
  }

  return category
}

const categoryService = {
  getAll,
  create,
  update,
  remove,
  detail,
}

export default categoryService
