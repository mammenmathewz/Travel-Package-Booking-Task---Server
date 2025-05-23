import express from "express"
import cors from "cors"
import router from "./routes/index"




const app = express()
app.use(cors({
    origin:"*"
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api',router)

export default app