import { NextFunction, Request, Response } from "express"
import productServices from "../services/productServices.js"
import { SuccessResponse } from "../utils/response.js"
import validation from "../validations/validation.js"
import productValidation from "../validations/productValidation.js"

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedQuery = await validation(req.query, productValidation.query)
    const { products, totalItems, totalPages } = await productServices.getAll(
      req.userId,
      validatedQuery,
    )

    return res.status(200).json(
      new SuccessResponse(
        "Products fetched successfully",
        { products },
        {
          total_items: totalItems,
          total_pages: totalPages,
          current_page: validatedQuery.page,
          limit: validatedQuery.limit,
        },
      ),
    )
  } catch (err) {
    next(err)
  }
}

const detail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId
    const { id } = await validation(req.params, productValidation.id)

    const product = await productServices.detail(userId, id)
    return res
      .status(200)
      .json(new SuccessResponse("Product fetched successfully", { product }))
  } catch (error) {
    next(error)
  }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId
    const validatedData = await validation(req.body, productValidation.create)

    const product = await productServices.create(
      userId,
      validatedData,
      req.file,
    )
    return res
      .status(201)
      .json(new SuccessResponse("Product created successfully", { product }))
  } catch (error) {
    next(error)
  }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId
    const { id } = await validation(req.params, productValidation.id)
    const validatedData = await validation(req.body, productValidation.update)

    const product = await productServices.update(
      userId,
      id,
      validatedData,
      req.file,
    )
    return res
      .status(200)
      .json(new SuccessResponse("Product updated successfully", { product }))
  } catch (error) {
    next(error)
  }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId
    const { id } = await validation(req.params, productValidation.id)

    await productServices.remove(userId, id)
    return res
      .status(200)
      .json(new SuccessResponse("Product deleted successfully", {}))
  } catch (error) {
    next(error)
  }
}

const productController = {
  getAll,
  detail,
  create,
  update,
  remove,
}

export default productController
