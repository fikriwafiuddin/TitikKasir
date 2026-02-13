import express from "express"
import reportController from "../controllers/reportController.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const reportRouter = express.Router()

reportRouter.use(authMiddleware)

reportRouter.get("/", reportController.getSummary)

export default reportRouter
