
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./list.css"
import { ToastContainer, toast } from 'react-toastify';

const BACKENDURL = import.meta.env.BACKENDURL;

const ListImages = () => {


  const [uploadedImages, setUploadedImages] = useState([])

  //Fetch images on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${BACKENDURL}api/images`);
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

      const response = await axios.delete(`${BACKENDURL}api/images/${id}`);
      setUploadedImages(prev => prev.filter(img => img._id !== id));

      response.data.success ? toast.success(response.data.message) : toast.error(response.data.message)
    } catch (error) {
      toast.error('Delete failed:', error);
    }
  };


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

            {/* <h5> Date : {new Date().toLocaleDateString()} </h5> */}
            {/* <h6>Time : {new Date().toLocaleTimeString()}</h6> */}
          </div>

        )}


      </div>



    </div>
  )
}

export default ListImages


