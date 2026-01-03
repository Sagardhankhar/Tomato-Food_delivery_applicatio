import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodroutes.js"
import userRouter from "./routes/userroutes.js"
import 'dotenv/config'
import cartRouter from './routes/cartroutes.js'
import orderRouter from "./routes/orderroutes.js"
// app config
const app = express()

// define port number
const port = 4000

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// connect database

connectDB();

// api endpoint 
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
// test route
app.get("/", (req, res) => {
    res.send("API working")
})

// run express server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})
// mongodb+srv://sagarjaat659:sagarjaat2612@cluster0.r4o3krn.mongodb.net/?appName=Cluster0
