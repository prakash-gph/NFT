
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./list.css"
import { ToastContainer, toast } from 'react-toastify';

const BACKENDURL = import.meta.env.BACKENDURL;

const ListImages = () => {

  console.log(BACKENDURL)

  const [uploadedImages, setUploadedImages] = useState([])

  //Fetch images on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${BACKENDURL}/api/images/image-get`);
        setUploadedImages(response.data);


      } catch (error) {
        toast.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);



  console.log(new Date().toLocaleDateString(), new Date().toLocaleTimeString() + " date")



  const handleDelete = async (id) => {
    try {

      const response = await axios.delete(`${BACKENDURL}/api/images/image-delete/${id}`);
      setUploadedImages(prev => prev.filter(img => img._id !== id));

      response.data.success ? toast.success(response.data.message) : toast.error(response.data.message)
    } catch (error) {
      toast.error('Delete failed:', error);
    }
  };

  console.log(uploadedImages)

  return (
    <div>
      <ToastContainer />

      <h1 className="list-image-divh1">{uploadedImages.length === 1 ? "Total image: " + uploadedImages.length : "Total images " + uploadedImages.length}</h1>

      <div className="list-image-div">

        {uploadedImages.map((image) =>
          <div key={image._id} className="image-gallery-items">

            <button
              className="image-remove-btn3"
              onClick={() => handleDelete(image._id)}
              title="Delete image"
            >
              &times;
            </button>

            <img src={image.url}></img>

            <div className="list-images-Date">
              <h4> Date : {image.createdAt} </h4>
            </div>


          </div>

        )}


      </div>



    </div>
  )
}

export default ListImages


