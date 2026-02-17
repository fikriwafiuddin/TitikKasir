import productRepository from "../repositories/productRepository.js"
import categoryRepository from "../repositories/categoryRepository.js"
import { generateNextProductSku } from "../helpers/productHelper.js"
import { ErrorResponse } from "../utils/response.js"
import prisma from "../lib/prisma.js"
import cloudinary from "../lib/cloudinary.js"
import { UploadApiOptions } from "cloudinary"

const uploadFromBuffer = (buffer: Buffer, options: UploadApiOptions) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) return reject(error)
        resolve(result)
      },
    )
    stream.end(buffer)
  })
}

const getAll = async (
  userId: string,
  params: { page: number; limit: number; name?: string; category_id?: number },
) => {
  const { page, limit, name, category_id } = params
  const skip = (page - 1) * limit

  const where: any = {
    user_id: userId,
  }

  if (name) {
    where.name = {
      contains: name,
      mode: "insensitive",
    }
  }

  if (category_id) {
    where.category_id = category_id
  }

  const [products, totalItems] = await Promise.all([
    productRepository.findAll(where, skip, limit),
    productRepository.count(where),
  ])

  return {
    products,
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
  }
}

const create = async (
  userId: string,
  data: any,
  file?: Express.Multer.File,
) => {
  const { name, category_id } = data

  const category = await categoryRepository.findById(userId, category_id)
  if (!category) {
    throw new ErrorResponse("Category not found or inactive", 404)
  }

  const productExists = await productRepository.findByName(userId, name)
  if (productExists) {
    throw new ErrorResponse("Product name already exists", 400)
  }

  const { nextSku } = await generateNextProductSku(userId, category_id)

  let imageUrl = null
  if (file) {
    try {
      const upload: any = await uploadFromBuffer(file.buffer, {
        folder: `titik-kasir/products/${userId}`,
      })
      imageUrl = upload.secure_url
    } catch (error) {
      throw new ErrorResponse("Failed to upload image", 500)
    }
  }

  return await prisma.$transaction(async (tx) => {
    const product = await tx.product.create({
      data: {
        user_id: userId,
        category_id,
        sku: nextSku,
        name,
        stock: data.stock,
        price: data.price,
        image: imageUrl,
      },
    })

    // Update latest_sku and increment total_items in category
    await tx.category.update({
      where: { id: category_id },
      data: {
        latest_sku: nextSku,
        total_items: {
          increment: 1,
        },
      },
    })

    return product
  })
}

const update = async (
  userId: string,
  id: number,
  data: any,
  file?: Express.Multer.File,
) => {
  const product = await productRepository.findById(userId, id)
  if (!product) {
    throw new ErrorResponse("Product not found", 404)
  }

  if (data.name) {
    const productExists = await productRepository.findByName(userId, data.name)
    if (productExists && productExists.id !== id) {
      throw new ErrorResponse("Product name already exists", 400)
    }
  }

  let imageUrl = product.image
  if (file) {
    try {
      // Delete old image if exists
      if (product.image) {
        const publicId = product.image.split("/").pop()?.split(".")[0]
        if (publicId) {
          await cloudinary.uploader.destroy(
            `titik-kasir/products/${userId}/${publicId}`,
          )
        }
      }

      const upload: any = await uploadFromBuffer(file.buffer, {
        folder: `titik-kasir/products/${userId}`,
      })
      imageUrl = upload.secure_url
    } catch (error) {
      throw new ErrorResponse("Failed to upload image", 500)
    }
  }

  const updateData = {
    ...data,
    image: imageUrl,
  }

  // Handle category change (update total_items)
  if (data.category_id && data.category_id !== product.category_id) {
    const category = await categoryRepository.findById(userId, data.category_id)
    if (!category) {
      throw new ErrorResponse("Category not found or inactive", 404)
    }

    return await prisma.$transaction(async (tx) => {
      // Decrement old category
      await tx.category.update({
        where: { id: product.category_id },
        data: { total_items: { decrement: 1 } },
      })

      // Increment new category
      await tx.category.update({
        where: { id: data.category_id },
        data: { total_items: { increment: 1 } },
      })

      return await productRepository.update(id, updateData)
    })
  }

  return await productRepository.update(id, updateData)
}

const remove = async (userId: string, id: number) => {
  const product = await prisma.product.findFirst({
    where: { id, user_id: userId },
  })
  if (!product) {
    throw new ErrorResponse("Product not found", 404)
  }

  // Check if product is used in any order items
  const orderItemExist = await prisma.orderItem.findFirst({
    where: { product_id: id },
  })

  return await prisma.$transaction(async (tx) => {
    if (orderItemExist) {
      // Soft delete
      await tx.product.update({
        where: { id },
        data: { is_active: false },
      })
    } else {
      // Hard delete: Delete image from cloudinary first
      if (product.image) {
        const publicId = product.image.split("/").pop()?.split(".")[0]
        if (publicId) {
          await cloudinary.uploader.destroy(
            `titik-kasir/products/${userId}/${publicId}`,
          )
        }
      }
      await tx.product.delete({
        where: { id },
      })
    }

    // Decrement category total_items
    await tx.category.update({
      where: { id: product.category_id },
      data: {
        total_items: {
          decrement: 1,
        },
      },
    })

    return product
  })
}

const detail = async (userId: string, id: number) => {
  const product = await productRepository.findById(userId, id)
  if (!product) {
    throw new ErrorResponse("Product not found", 404)
  }
  return product
}

const productServices = {
  getAll,
  create,
  update,
  remove,
  detail,
}

export default productServices
