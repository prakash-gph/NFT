import express, { json } from "express"
import dotenv from "dotenv";
import connectdb from "./database/db.js"
import cors from "cors"

// import { volunteerRouters} from "./router/urouter.js";

//import { adminLogin } from "./adminControllers/adminAuthController.js";

// import connectedCloudinary from "./nodemailer/cloudinary.js";

// import { imageUpload, imageGet, imageDelete, videosUpload, videoGet, videoDelete } from "./adminControllers/adminImagesUploadControllers.js";

// import multer from "multer";

const port = process.env.PORT || 3000;

dotenv.config()

const app = express()

connectdb()

app.use(json())
app.use(cors())
// app.use(volunteerRouters)
// app.use(adminLogin)
// app.use(imageUpload);
// app.use(imageGet);
// app.use(imageDelete,);
// app.use(videosUpload);
// app.use(videoGet);
// app.use(videoDelete);

//  connectedCloudinary()
//  app.use((err, req, res, next) => {

//     if (err instanceof multer.MulterError) {

//         switch (err.code) {

//             case "LIMIT_FILE_SIZE":

//                 if (err.field === 'video') return res.json({ success: false, message: "File is large : Maximum video size 30 MB" })



//                 return res.json({ success: false, message: "File is large : Maximum image size 5 MB " })

//             default:

//                 if (err.field === 'video') return res.json({ success: false, message: " Please single file upload" })



//                 if (err.field === 'images') {
//                     console.log(err)
//                     return res.json({ success: false, message: "Maximum 5 images selecte" })

//                 }

//         }
//     }
//     else {
//         return res.json({ success: false, message: err.message })
//     }

//  })


app.get("/", (req, res) => {
    res.json("Api is Running")
})
app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`)
})
