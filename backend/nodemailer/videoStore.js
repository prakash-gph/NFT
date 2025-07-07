import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary  from "cloudinary"

export const videoStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        
        folder: 'videos_Upload',
        resource_type: 'video',
        allowed_formats: ['mp4', 'mov', 'avi', 'mkv'],
        format: async (req, file) => 'mp4',

    }
  

});