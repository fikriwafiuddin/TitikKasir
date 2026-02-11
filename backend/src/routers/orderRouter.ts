import express from "express"
import orderController from "@/controllers/orderController.js"
import authMiddleware from "@/middlewares/authMiddleware.js"

const orderRouter = express.Router()

orderRouter.use(authMiddleware)

orderRouter.post("/", orderController.create)
orderRouter.get("/", orderController.getAll)
orderRouter.get("/:orderId", orderController.detail)
orderRouter.patch("/:orderId/status", orderController.updateStatus)

export default orderRouter
