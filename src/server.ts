import env from "dotenv"
env.config()

import app from "./app"
import { connectDB }from "./config/mongoSetup"


const PORT = process.env.PORT || 5000

connectDB()
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})