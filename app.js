import dotenv from "dotenv"
import express from "express"
import AppDataSource from "./config/config.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

async function startServer() {
  try {
    await AppDataSource.initialize()
    console.log("Data Source has been initialized!")

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (err) {
    console.error("Error during Data Source initialization", err)
    process.exit(1)
  }
}

startServer()

export default app

