
import './gallery.css';
import { useState, useEffect } from 'react';
import { Lightbox } from "./Galleryanima";
import axios from "axios"

const Gallery = () => {

  const [selectedImg, setSelectedImg] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([])

  const BACKEND_URL = import.meta.env.BACKEND_URL;
 //w
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}api/images`);
        setUploadedImages(response.data);

      } catch (error) {
        toast.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  return (

    <div>
      <div className='g-head'>
        <h1 style={{ textAlign: "center" }}>GALLERY</h1>
      </div>

      <div className="gallery-container">

        {uploadedImages.map((image) => (
          <div
            key={image._id}
            className="gallery-item"
            onClick={() => setSelectedImg(image)}
          >
            <img
              src={image.url}
              alt={image.title}
              className="gallery-image"
            />
            <div className="image-overlay">
              <p className="image-title">{image.title}</p>
            </div>
          </div>
        ))}
        {selectedImg && (
          <Lightbox image={selectedImg} onClose={() => setSelectedImg(null)} />
        )}
      </div>

    </div>



  );
};

export default Gallery;
