import express, { json } from "express"
import cors from "cors"
import dotenv from "dotenv";
import { contactRouters, volunteerRouters } from "./router/urouter.js";
// import {otpVerifiy} from "./router/urouter.js"
import connectdb from "./database/db.js"
import { adminLogin, adminSendOtp, resetPassword } from "./adminControllers/adminAuthController.js";
// import { uploadImages,uploadVideos } from "./adminControllers/imagesVideosControllers.js";
import connectedCloudinary from "./nodemailer/cloudinary.js";

// import uploadImages, { getImage } from "./adminControllers/adminImagesUploadControllers.js";
// import { imaSave } from "./adminControllers/adminImagesUploadControllers.js";
import { router } from "./adminControllers/adminImagesUploadControllers.js";
import multer from "multer";

const app = express()
dotenv.config()

console.log(process.env.PORT)

const port = process.env.PORT || 4000;


app.get("/", (req, res) => {
    res.json("api is working")
})
app.use(json())
app.use(cors())
app.use(contactRouters)
app.use(volunteerRouters)
// app.use(otpVerifiy)
app.use(adminLogin)
app.use(adminSendOtp)
app.use(resetPassword)
// app.use(uploadImages)
// app.use(imaSave)
// app.use(getImage)

app.use(router);

// app.use(uploadVideos)


app.use((err, req, res, next) => {

    if (err instanceof multer.MulterError) {

        switch (err.code) {

            case "LIMIT_FILE_SIZE":

                if (err.field === 'video') return res.json({ success: false, message: "File is large : Maximum video size 30 MB" })

               

                return res.json({ success: false, message: "File is large : Maximum image size 5 MB " })

            default:

                 if(err.field === 'video') return res.json({ success: false, message: " Please single file upload" })
               

               
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


app.listen(4000,'0.0.0.0', () => {
    console.log(`Server is running http://localhost:${port}`)
    connectdb()
    connectedCloudinary()
})
