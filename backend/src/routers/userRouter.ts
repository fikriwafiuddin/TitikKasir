import express from "express"
import userController from "@/controllers/userController.js"
import authMiddleware from "@/middlewares/authMiddleware.js"

const userRouter = express.Router()

userRouter.use(authMiddleware)

userRouter.get("/me", userController.getUserData)
userRouter.patch("/shop-name", userController.updateShopName)

export default userRouter
