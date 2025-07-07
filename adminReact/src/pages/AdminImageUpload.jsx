
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import uploadImage from "../assets/uploadimg.png"
import axios from 'axios';
import "./AdminImageUpload.css"

const BACKEND_URL = import.meta.env.BACKEND_URL;



const AdminImageUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
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
        formData.append('images', file);
      });

      const response = await axios.post(`${BACKEND_URL}api/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success === false) {
        return toast.error(response.data.message)
      }


      // Add new images to existing ones
      //  setUploadedImages(prev => [...response.data  , ...prev]);

      let newImages = [];

      if (Array.isArray(response.data)) {
        // Case: Response is already an array
        newImages = response.data;
      } else if (response.data.images && Array.isArray(response.data.images)) {
        // Case: Response has images array property
        newImages = response.data.images;
      } else {
        // Case: Single image object
        newImages = [response.data];
      }

      setUploadedImages(prev => [...newImages, ...prev]);

      console.log(response.data.success ? toast.success(response.data.message) : toast.error(response.data.message))

      // Reset form
      setSelectedFiles([]);
      setPreviews([]);
      toast.success("Upload Successfully ")
    } catch (error) {
      toast.error('Upload failed:', error);

    } finally {
      setIsUploading(false);

    }

  };

  const handleDelete = async (id) => {
    try {

      const response = await axios.delete(`${BACKEND_URL}api/images/${id}`);
      setUploadedImages(prev => prev.filter(img => img._id !== id));

      response.data.success ? toast.success(response.data.message) : toast.error(response.data.message)

    } catch (error) {
      toast.error('Delete failed:', error);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <h2 className='img-upload-heading' style={{ color: "black", textAlign: "center" }}>Image Upload</h2>

      {/* Upload Form */}

      <form onSubmit={handleSubmit}>
        <div className="upload-container">

          <div className="form-group">
            <input className='upload-input'
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*"
              id="fileInput"
              disabled={isUploading}
            />
            <label htmlFor="fileInput" className="upload-label">
              <img src={uploadImage} alt="image Error" />
              <h3>{previews.length === 1 ? "Selected image: " + previews.length : "Selected images: " + previews.length}</h3>
            </label>
          </div>

          <hr className='image-line'></hr>
        </div>
        {/* Previews */}
        <div className="preview-container">
          {previews.map((preview, index) => (
            <div key={index} className="preview-item">
              <h3 onClick={() => handleRemove(index)} className='remove-btn'>X</h3>
              <img
                src={preview}
                alt={`Preview ${index}`}
              />

              {/* <p>{selectedFiles[index].name}</p> */}
            </div>
          ))}

        </div>
        <hr className='image-line'></hr>

        <button
          type="submit"
          className="imageuploadbtn"
          disabled={isUploading || selectedFiles.length === 0}
        >
          {isUploading ? 'Please wait images is Uploading...' : 'Upload Images'}
        </button>
      </form>

      {/* Uploaded Images */}
      <h3>Uploaded Images ({uploadedImages.length})</h3>
      <div className="Uploaded-Images-views">

        {uploadedImages.map(images => (

          <div key={images._id} className="gallery-item">
            
            <button
              className="image-remove-btn2"
              onClick={() => handleDelete(images._id)}
              title="Delete image"
            >
              &times;
            </button>
            <img className='gallery-itemImage' src={images.url} alt={`Uploaded ${images.publicId}`} />

          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminImageUpload;



