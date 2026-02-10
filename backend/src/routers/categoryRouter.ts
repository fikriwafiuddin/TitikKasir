import authMiddleware from "@/middlewares/authMiddleware.js"
import categoryController from "@/controllers/categoryController.js"
import express from "express"

const categoryRouter = express.Router()

categoryRouter.get("/", authMiddleware, categoryController.getAll)
categoryRouter.get("/:id", authMiddleware, categoryController.detail)
categoryRouter.post("/", authMiddleware, categoryController.create)
categoryRouter.put("/:id", authMiddleware, categoryController.update)
categoryRouter.delete("/:id", authMiddleware, categoryController.remove)

export default categoryRouter
