//import ReactPlayer from "react-player"

import { useState } from "react";
import uploadImage from "../assets/uploadimg.png"
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./AdminVideoUpload.css"

const BACKENDURL = import.meta.env.BACKENDURL;

const AdminVideosUpload = () => {


  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    // Generate previews
    const previewUrls = files.map(file => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const handleRemove = (removeIndex) => {
   

    const updateFiles = selectedFiles.filter((_, index) => index !== removeIndex)

    const updatePreviewsFiles = previews.filter((_, index) => index !== removeIndex)
    URL.revokeObjectURL(previews[removeIndex])

    setSelectedFiles(updateFiles)
    setPreviews(updatePreviewsFiles)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
   
    try {
      const formData = new FormData();
      selectedFiles.forEach(file => {
       
        formData.append('video', file);
      });

      
      const response = await axios.post(`${BACKENDURL}/api/videos/video-post`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success === false) {
        return toast.error(response.data.message)
      }
      let newVideos = [];

      if (Array.isArray(response.data)) {
        // Case: Response is already an array
        newVideos = response.data;
      } else if (response.data.images && Array.isArray(response.data.images)) {
        // Case: Response has images array property
        newVideos = response.data.images;
      } else {
        // Case: Single image object
        newVideos = [response.data];
      }

      setUploadedVideos(prev => [...newVideos, ...prev]);

    

      // Reset form
      setSelectedFiles([]);
      setPreviews([]);
      toast.success("Upload Successfully ")
    } catch (error) {
      console.log(error)
      toast.error('Upload failed:', error);

    } finally {
      setIsUploading(false);

    }

  };

  const handleDelete = async (id) => {
    try {

      const response = await axios.delete(`${BACKENDURL}/api/videos/video-delete/${id}`);
      setUploadedVideos(prev => prev.filter(vid => vid._id !== id));

      response.data.success ? toast.success(response.data.message) : toast.error(response.data.message)

    } catch (error) {
      toast.error('Delete failed:', error);
    }
  };



  return (
    <div>
      <h1 className="vid-upload-heading">Admin upload video page</h1>
      <ToastContainer></ToastContainer>

      <form onSubmit={handleSubmit}>
        <div className="upload-container">

          <div className="form-group-vid">
            <input className='upload-input-vid'
              type="file"
              multiple
              onChange={handleFileChange}
              accept="video/*"
              id="fileInput"
              disabled={isUploading}
            />
            <label htmlFor="fileInput" className="upload-label-vid">
              <img src={uploadImage} alt="image Error" />
              <h3>{previews.length === 1 ? "Selected video: " + previews.length : "Selected videos: " + previews.length}</h3>
            </label>
          </div>

          <hr className='image-line-vid'></hr>
        </div>
        {/* Previews */}
        <div className="preview-container-vid">
          {previews.map((preview, index) => (
            <div key={index} className="preview-item-vid">
              <h3 onClick={() => handleRemove(index)} className='remove-btn-vid'>X</h3>
              {/* <ReactPlayer className="preview-item-video"
                url={preview}
                controls={true}
               

              /> */}

              {/* <p>{selectedFiles[index].name}</p> */}
            </div>
          ))}

        </div>
        <hr className='image-line-vid'></hr>
{/* 
        <button
          type="submit"
          className="videouploadbtn"
          disabled={isUploading || selectedFiles.length === 0}
        >
          {isUploading ? 'Please wait images is Uploading...' : 'Upload Images'}
        </button> */}
      </form>
      {/* Uploaded Images */}
      <h3>Uploaded Videos ({uploadedVideos.length})</h3>
      <div className="Uploaded-videos-views">

        {uploadedVideos.map(videos=> (

          <div key={videos._id} className="gallery-item-vid">
{/* 
            <button
              className="videos-remove-btn2"
              onClick={() => handleDelete(videos._id)}
              title="Delete image"
            >
              &times;
            </button> */}

            {/* <ReactPlayer className='gallery-itemvideos' url={videos.videoUrl} controls={true} alt={`Uploaded ${videos.cloudinaryId}`} /> */}

          </div>
        ))}
      </div>

    </div>
  )
}

export default AdminVideosUpload
