import express, { json } from "express"
import cors from "cors"
import dotenv from "dotenv";
import { volunteerRouters } from "./router/urouter.js";
import connectdb from "./database/db.js"
import { adminLogin, adminSendOtp, resetPassword } from "./adminControllers/adminAuthController.js";
import connectedCloudinary from "./nodemailer/cloudinary.js";
import { imageUpload, imageGet, imageDelete, videosUpload, videoGet, videoDelete } from "./adminControllers/adminImagesUploadControllers.js";
import multer from "multer";
// import {otpVerifiy} from "./router/urouter.js"
// import { uploadImages,uploadVideos } from "./adminControllers/imagesVideosControllers.js";
// import uploadImages, { getImage } from "./adminControllers/adminImagesUploadControllers.js";
// import { imaSave } from "./adminControllers/adminImagesUploadControllers.js";


dotenv.config()
const port = process.env.PORT || 3000;
const app = express()

console.log(process.env.PORT)

app.get("/", (req, res) => {
    res.json("api is running")
})
app.use(json())
app.use(cors())
app.use(volunteerRouters)
app.use(adminLogin)
app.use(adminSendOtp)
app.use(resetPassword)
app.use(imageUpload);
app.use(imageGet);
app.use(imageDelete);
app.use(videosUpload);
app.use(videoGet);
app.use(videoDelete);

// app.use(uploadVideos)
// app.use(uploadImages)
// app.use(imaSave)
// app.use(getImage)
// app.use(otpVerifiy)


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

connectedCloudinary()
 
app.listen(3000, () => {
    console.log(`Server is running http://localhost:${port}`)
    connectdb()
    
})
