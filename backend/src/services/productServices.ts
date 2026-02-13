import productRepository from "../repositories/productRepository.js"
import categoryRepository from "../repositories/categoryRepository.js"
import { generateNextProductSku } from "../helpers/productHelper.js"
import { ErrorResponse } from "../utils/response.js"
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

  const product = await productRepository.create({
    user_id: userId,
    category_id,
    sku: nextSku,
    name,
    stock: data.stock,
    price: data.price,
    image: imageUrl,
  })

  // Update latest_sku in category
  await categoryRepository.update(category_id, {
    latest_sku: nextSku,
  })

  return product
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

  return await productRepository.update(id, {
    ...data,
    image: imageUrl,
  })
}

const remove = async (userId: string, id: number) => {
  const product = await productRepository.findById(userId, id)
  if (!product) {
    throw new ErrorResponse("Product not found", 404)
  }

  // Delete image from cloudinary
  if (product.image) {
    const publicId = product.image.split("/").pop()?.split(".")[0]
    if (publicId) {
      await cloudinary.uploader.destroy(
        `titik-kasir/products/${userId}/${publicId}`,
      )
    }
  }

  return await productRepository.deleteById(id)
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
