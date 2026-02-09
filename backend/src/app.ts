import express from "express"
import cors from "cors"
import router from "./routers/router.js"
import httpLogger from "./middlewares/httpLogger.js"

const app = express()

app.use(
  cors({
    origin: (process.env.CORS_ORIGIN || "http://localhost:5173").split(","),
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(httpLogger)
app.use(router)

export default app
