import multer from "multer"

import { storage } from "./cloudinary.js";
import { videoStorage } from "./videoStore.js";
export const parser = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/image\/(jpeg|jpg|png)/)) {
            return cb(new Error('Only images are allowed'), false);
        }
        console.log(storage)
        cb(null, true);
    }
});

export const videoUpload = multer({
    videoStorage,
    fileFilter: (req, file, cd) => {
        if (file.originalname) {
            console.log(file.originalname)
            console.log(videoStorage)
        }
        cd(null, true)

    }
});

