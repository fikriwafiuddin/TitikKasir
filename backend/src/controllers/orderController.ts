import { NextFunction, Request, Response } from "express"
import orderServices from "../services/orderServices.js"
import { SuccessResponse } from "../utils/response.js"
import validation from "../validations/validation.js"
import orderValidation from "../validations/orderValidation.js"

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId
    const validatedData = await validation(req.body, orderValidation.create)

    const order = await orderServices.create(userId, validatedData)

    return res
      .status(201)
      .json(new SuccessResponse("Order created successfully", { order }))
  } catch (error) {
    next(error)
  }
}

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId
    const validatedQuery = await validation(req.query, orderValidation.query)

    const { orders, totalItems, totalPages } = await orderServices.getAll(
      userId,
      validatedQuery,
    )

    return res.status(200).json(
      new SuccessResponse(
        "Orders fetched successfully",
        { orders },
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
    const { orderId } = await validation(req.params, orderValidation.orderId)

    const order = await orderServices.details(userId, orderId)

    return res
      .status(200)
      .json(new SuccessResponse("Order fetched successfully", { order }))
  } catch (error) {
    next(error)
  }
}

const updateStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId
    const { orderId } = await validation(req.params, orderValidation.orderId)
    const { status } = await validation(req.body, orderValidation.updateStatus)

    const order = await orderServices.updateStatus(userId, orderId, status)

    return res
      .status(200)
      .json(new SuccessResponse("Order status updated successfully", { order }))
  } catch (error) {
    next(error)
  }
}

const orderController = {
  create,
  getAll,
  detail,
  updateStatus,
}

export default orderController
