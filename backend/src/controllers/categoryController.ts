import { NextFunction, Request, Response } from "express"
import categoryService from "../services/categoryServices.js"
import { SuccessResponse } from "../utils/response.js"
import validation from "../validations/validation.js"
import categoryValidation from "../validations/categoryValidation.js"

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedQuery = await validation(req.query, categoryValidation.query)
    const { categories, totalItems, totalPages } = await categoryService.getAll(
      req.userId,
      validatedQuery,
    )

    return res.status(200).json(
      new SuccessResponse(
        "Categories fetched successfully",
        { categories },
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
    const { id } = await validation(req.params, categoryValidation.id)

    const category = await categoryService.detail(userId, id)
    return res
      .status(200)
      .json(new SuccessResponse("Category fetched successfully", { category }))
  } catch (error) {
    next(error)
  }
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId
    const data = req.body

    const validatedData = await validation(data, categoryValidation.create)

    const category = await categoryService.create(userId, validatedData)
    return res
      .status(201)
      .json(new SuccessResponse("Category created successfully", { category }))
  } catch (error) {
    next(error)
  }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId
    const { id } = await validation(req.params, categoryValidation.id)
    const data = req.body

    const validatedData = await validation(data, categoryValidation.update)

    const category = await categoryService.update(userId, id, validatedData)
    return res
      .status(200)
      .json(new SuccessResponse("Category updated successfully", { category }))
  } catch (error) {
    next(error)
  }
}

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId
    const { id } = await validation(req.params, categoryValidation.id)

    await categoryService.remove(userId, id)
    return res
      .status(200)
      .json(new SuccessResponse("Category deleted successfully", {}))
  } catch (error) {
    next(error)
  }
}

const categoryController = {
  getAll,
  detail,
  create,
  update,
  remove,
}

export default categoryController
