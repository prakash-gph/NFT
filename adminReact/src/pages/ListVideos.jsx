
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./ListVideo.css"
import { ToastContainer, toast } from 'react-toastify';
import ReactVideo from "react-player"

const BACKENDURL = import.meta.env.BACKENDURL;

const ListVideos = () => {

    console.log(BACKENDURL)

    const [uploadedVideos, setUploadedVideos] = useState([])

    //Fetch images on component mount
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`${BACKENDURL}/api/videos/video-get`);
                setUploadedVideos(response.data);

            } catch (error) {
                toast.error('Error fetching videos:', error);
            }
        };
        fetchImages();
    }, []);
    console.log(uploadedVideos)

    console.log(new Date().toLocaleDateString(), new Date().toLocaleTimeString() + " date")



    const handleDelete = async (id) => {
        try {

            const response = await axios.delete(`${BACKENDURL}/api/videos/video-delete/${id}`);
            setUploadedVideos(prev => prev.filter(img => img._id !== id));

            response.data.success ? toast.success(response.data.message) : toast.error(response.data.message)
        } catch (error) {
            toast.error('Delete failed:', error);
        }
    };



    return (
        <div>
            <ToastContainer />

            <h1 className="list-video-divh1">{uploadedVideos.length === 1 ? "Total video: " + uploadedVideos.length : "Total videos: " + uploadedVideos.length}</h1>

            <div className="list-video-div">

                {uploadedVideos.map((video) => (
                    <div key={video._id} className="video-gallery-items">

                        <button
                            className="video-remove-btn3"
                            onClick={() => handleDelete(video._id)}
                            title="Delete videos"
                        >
                            &times;
                        </button>

                        <ReactVideo src={video.videoUrl} controls={true}  className="video"/>
                    </div>

                ))}


            </div>



        </div>
    )
}

export default ListVideos


