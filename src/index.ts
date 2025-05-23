import "dotenv/config"
import express, { Application } from "express"
import userAvatarRouter from "./routes/user-avatar"
import { PORT } from "./constants/env"

const app: Application = express()

app.use("/user-avatar", userAvatarRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
