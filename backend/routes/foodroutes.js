 
 import express from 'express'
import { addFood, listfood ,removefood} from '../controllers/foodcontrollers.js'
import multer from 'multer' // handles image/file uploads

// create router
const foodRouter = express.Router()

// image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        // unique filename using timestamp
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

// multer middleware
const upload = multer({ storage: storage })

// POST request to add food with image
foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.get("/list",listfood)
foodRouter.post("/removefood",removefood)
export default foodRouter;


