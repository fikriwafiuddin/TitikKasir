import express from "express"
import productController from "@/controllers/productController.js"
import authMiddleware from "@/middlewares/authMiddleware.js"
import upload from "@/middlewares/upload.js"

const productRouter = express.Router()

productRouter.use(authMiddleware)

productRouter.get("/", productController.getAll)
productRouter.get("/:id", productController.detail)
productRouter.post("/", upload.single("image"), productController.create)
productRouter.put("/:id", upload.single("image"), productController.update)
productRouter.delete("/:id", productController.remove)

export default productRouter
