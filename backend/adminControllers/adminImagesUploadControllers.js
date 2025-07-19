
import express from "express"
import { adminUploadImageVideo, Video } from "../datamodel/duser.js"
import { parser, videoUpload } from "../nodemailer/multer.js"
import cloudinary from "cloudinary"

const imageRouter = express.Router()

export const imageUpload = imageRouter.post('/image-post', parser.array('images', 5), async (req, res) => {
             
  // const description = req.body.description;

  // console.log(description)

  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No images uploaded' });
    }

    const uploadedImages = await Promise.all(
      req.files.map(async (file , index) => {
        return await adminUploadImageVideo.create({
          // description:req.body.description[index],
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
export const imageGet = imageRouter.get('/image-get', async (req, res) => {

  try {
    const images = await adminUploadImageVideo.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE Endpoint - Delete image
export const imageDelete = imageRouter.delete('/image-delete/:id', async (req, res) => {
  try {

    const image = await adminUploadImageVideo.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }


    await cloudinary.uploader.destroy(image.publicId);

    await adminUploadImageVideo.deleteOne({ _id: req.params.id });

    res.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Delete failed' });
  }
});

export const videosUpload = imageRouter.post('/video-post', videoUpload.single('video'), async (req, res) => {
  try {


    const newVideo = await new Video({
      // description: req.body.description,
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


export const videoGet = imageRouter.get('/video-get', async (req, res) => {

  try {

    const videoFind = await Video.find().sort({ createdAt: -1 });


    res.json(videoFind)

  } catch (error) {
    res.json({ successfull: false, message: error })
  }
})


export const videoDelete = imageRouter.delete('/video-delete/:id', async (req, res) => {

  try {

    const videoId = await Video.findById(req.params.id)
    
    const result = await cloudinary.uploader.destroy(videoId.cloudinaryId, { resource_type: 'video', invalidate: true })

  
    await Video.deleteOne({ _id: req.params.id })

    console.log("successfully deleted videos")

    return res.json({ success: true, message: "Deleted video" })
  }
  catch (error) {

    console.log(error)
    
    res.json({ success: false, message: error })

  }
})

