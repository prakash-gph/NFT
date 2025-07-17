import express, { json } from "express"
import dotenv from "dotenv";
import connectdb from "./database/db.js"
import cors from "cors"

import { routers, volunteerRouters, adminLogin } from "./router/urouter.js";


 import connectedCloudinary from "./nodemailer/cloudinary.js";

import { imageUpload, imageGet, imageDelete, videosUpload, videoGet, videoDelete } from "./adminControllers/adminImagesUploadControllers.js";

 import multer from "multer";

const port = process.env.PORT || 3000;

dotenv.config()

const app = express()

connectdb()

app.use(json())
app.use(cors())
app.use("/api", routers);
app.use("/api", volunteerRouters)
app.use("/api", adminLogin)
app.use("/api/images",imageUpload);
app.use("/api/images", imageGet);
app.use("/api/videos",imageDelete);
app.use("/api/videos",videosUpload);
app.use("/api/videos",videoGet);
app.use("/api/videos",videoDelete);

  connectedCloudinary()
 app.use((err, req, res, next) => {

    if (err instanceof multer.MulterError) {

        switch (err.code) {

            case "LIMIT_FILE_SIZE":

                if (err.field === 'video') return res.json({ success: false, message: "File is large : Maximum video size 30 MB" })



                return res.json({ success: false, message: "File is large : Maximum image size 5 MB " })

            default:

                if (err.field === 'video') return res.json({ success: false, message: " Please single file upload" })



                if (err.field === 'images') {
                    console.log(err)
                    return res.json({ success: false, message: "Maximum 5 images selecte" })

                }

        }
    }
    else {
        return res.json({ success: false, message: err.message })
    }

 })


app.get("/", (req, res) => {
    res.json("Api is running  ")
})
app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`)
})
