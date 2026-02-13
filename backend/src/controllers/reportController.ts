import { NextFunction, Request, Response } from "express"
import reportServices from "../services/reportServices.js"
import { SuccessResponse } from "../utils/response.js"

const getSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId
    const month =
      (req.query.month as string) ||
      (new Date().getMonth() + 1).toString().padStart(2, "0")
    const year =
      (req.query.year as string) || new Date().getFullYear().toString()

    const report = await reportServices.getReport(userId, month, year)

    return res
      .status(200)
      .json(new SuccessResponse("Report fetched successfully", report))
  } catch (error) {
    next(error)
  }
}

const reportController = {
  getSummary,
}

export default reportController
