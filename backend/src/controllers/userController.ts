import { NextFunction, Request, Response } from "express"
import userServices from "../services/userServices.js"
import { SuccessResponse } from "../utils/response.js"
import validation from "../validations/validation.js"
import userValidation from "../validations/userValidation.js"

const getUserData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId
    const user = await userServices.getByUserId(userId)

    return res
      .status(200)
      .json(new SuccessResponse("User data fetched successfully", { user }))
  } catch (error) {
    next(error)
  }
}

const updateShopName = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId
    const data = await validation(req.body, userValidation.updateShopName)

    const user = await userServices.updateShopName(userId, data.shop_name)

    return res
      .status(200)
      .json(new SuccessResponse("Shop name updated successfully", { user }))
  } catch (error) {
    next(error)
  }
}

const userController = {
  getUserData,
  updateShopName,
}

export default userController
