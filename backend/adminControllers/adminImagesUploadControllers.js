import express from "express"
// import { upload } from "../nodemailer/multer.js"
import { adminUploadImageVideo, Video } from "../datamodel/duser.js"
import { parser, videoUpload } from "../nodemailer/multer.js"
import cloudinary from "cloudinary"

const imageRouter = express.Router()

imageRouter.post('/api/images', parser.array('images', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No images uploaded' });
    }

    const uploadedImages = await Promise.all(
      req.files.map(async file => {
        return await adminUploadImageVideo.create({
          url: file.path,
          publicId: file.filename
        });
      })
    );

    res.status(201).json(uploadedImages);

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: 'Image upload failed' });
  }
});

// GET Endpoint - Retrieve all images
imageRouter.get('/api/images', async (req, res) => {
  try {
    const images = await adminUploadImageVideo.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE Endpoint - Delete image
imageRouter.delete('/api/images/:id', async (req, res) => {
  try {

    const image = await adminUploadImageVideo.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }
    console.log(image)

    await cloudinary.uploader.destroy(image.publicId);

    console.log("id2", image.publicId)

    await adminUploadImageVideo.deleteOne({ _id: req.params.id });

    res.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Delete failed' });
  }
});

imageRouter.post('/api/video-upload', videoUpload.single('video'), async (req, res) => {
  try {

    console.log(req.file.path, req.body.title, req.file.filename)

    const newVideo = await new Video({
      title: req.body.title,
      videoUrl: req.file.path,
      cloudinaryId: req.file.filename
    });

    await newVideo.save();

    res.status(201).json(newVideo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});


imageRouter.get("/api/video-upload", async (req, res) => {

  try {

    const videoFind = await Video.find().sort({ createdAt: -1 });

    console.log(videoFind)
    res.json({ videoFind })

  } catch (error) {
    res.json({ successfull: false, message: error })
  }
})


imageRouter.delete("/api/video-upload/:id", async (req, res) => {

  try {

    const videoId = await Video.findById(req.params.id)

  
    await cloudinary.uploader.destroy(videoId.cloudinaryId)

    await Video.deleteOne({ _id: req.params.id })

    console.log("successfully deleted videos")

   return res.json({ success: true, message: "Deleted video" })
  }
  catch (error) {

    console.log(error)
    res.json({ success: false, message: error })

  }
})

export const router = imageRouter;