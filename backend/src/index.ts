import "dotenv/config"
import app from "./app.js"
import logger from "./utils/logger.js"

const port = process.env.PORT || 5000

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    logger.info(`[Server] Server is running at http://localhost:${port}`)
  })
}

export default app
