import errorMiddleware from "@/middlewares/errorMiddleware.js"
import { ErrorResponse, SuccessResponse } from "@/utils/response.js"
import express from "express"
import categoryRouter from "./categoryRouter.js"
import productRouter from "./productRouter.js"
import orderRouter from "./orderRouter.js"
import reportRouter from "./reportRouter.js"
import userRouter from "./userRouter.js"

const router = express.Router()

router.use("/categories", categoryRouter)
router.use("/products", productRouter)
router.use("/orders", orderRouter)
router.use("/reports", reportRouter)
router.use("/users", userRouter)

router.get("/health", (req, res) => {
  res.status(200).json("ok")
})

router.get("/", (req, res) => {
  res.json(new SuccessResponse("TitikKasir Backend is running"))
})

router.all(/.*/, (req, res) => {
  res.status(404).json(new ErrorResponse("Not Found", 404))
})

router.use(errorMiddleware)

export default router
