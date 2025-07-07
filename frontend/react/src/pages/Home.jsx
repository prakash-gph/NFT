import  { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import "./Home.css"

function Home() {
  const slides = [
    
     { url: 'images/slide01.svg' },
    { url: 'images/slide1.svg' },
    { url: 'images/slide2.svg' },
    { url: 'images/slide3.svg' },
    { url: 'images/slide4.svg' },
    { url: 'images/slide5.svg' },

  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);


  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;

    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;

    const newIndex = isLastSlide ? 0 : currentIndex + 1;

    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };


  const [name, setname] = useState("");
  const [email, setemail] = useState("");

  const onsubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      return toast.warning("Must required name and email");
    }

    try {
      const { data } = await axios.post("https://nft1-backend.onrender.com/data", { name, email });

      if (data.error) {
        return toast.error(data.error);
      }
      else {
        setemail("");
        setname("");
        toast.success("Successfuly submit");
      }

    }

    catch (error) {
      console.log(error);
    }


  };
  return (

    <div>
      <ToastContainer />
      <div className="slides">

        <div className="slider-container">
          <div className="slider">
            <div className="slides-container"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div
                  className="slide"
                  key={index}
                  style={{ backgroundImage: `url(${slide.url})` }}

                ></div>
              ))}
            </div>
          </div>

          {/* Left Arrow */}
          <div className="left-arrow" onClick={goToPrevious}>&#10094;</div>

          {/* Right Arrow */}
          <div className="right-arrow" onClick={goToNext}>&#10095;</div>

          {/* Dots Indicator */}
          <div className="dots-container">
            {slides.map((_slide, slideIndex) => (
              <div
                className={`dot ${slideIndex === currentIndex ? 'active' : ''}`}
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
              ></div>
            ))}
          </div>
        </div>
      </div>



      <div className="container">
  <div className="row align-items-center">


  <div className="container my-5 mt-2">
  <div className="row align-items-center ">
    {/* Paragraph Container (Left Side) */}
    <div className="col-lg-5 mb-0 ">
      <h2 className="heading mb-4 ms-1 ">Who We Are</h2>
      
      <div className="intro-text ms-0  ">
        <p>
          Nation's First Trust (NFT) is dedicated to transforming Bharat into a developed nation.
          We aim to build a foundation of trust by focusing on sustainable growth, community empowerment, and innovation.
          Our initiatives are designed to enhance social welfare.
        </p>
      </div>

      <div className="vision-text ms-0 ">
        <p>
          Bharat, a land of rich heritage and immense potential, stands at the cusp of a new era.
          With its vibrant culture, diverse traditions, and strong values, it has long been a guiding light of selfless service
          and cultural strength. NFT envisions harnessing this strength to build a self-reliant and progressive nation.
        </p>
      </div>

      <div className="mission-text ms-0">
        <p>
          NATION'S FIRST TRUST is a registered Charitable Trust. NFT perceives its role as a catalyst in revitalizing cultural sensitivity,
          bridging tradition and modernity in today’s world.
        </p>
      </div>
      
      <h5 className="signature mt-0 text-end">- Nation's First Trust</h5>
    </div>

    {/* Image Container (Right Side) */}
    <div className="col-lg-7 text-center">
  <div className="custom-image-container mt-5">
    <img
      src="images/homein.png"
      alt="Who We Are"
      className="img-fluid rounded shadow"
    />
  </div>
</div>
  </div>
</div>
</div>
</div>

      <div className="container1 ">
        
        <div className='join-commu mt-0'>   
          <p> "Your small help can make a big difference Donate Now."</p>    
<div className="d-flex flex-column justify-content-center   gap-5">

<Link className="btn-custom btn-custom-success heartbeat" to="/Donation">
  Make a Donation🤍
</Link>
<Link className="btn-custom btn-custom-primary heartbeat" to="/Volunteer">
  Become a Volunteer
</Link>
 
</div>
        </div>


<div className="image-flex-container ">

  <img
    src="/images/homejoin.svg"
    alt="Join Us Illustration"
    className="responsive-image"
  />

</div>

      </div>



{/* 

   {<div className="container2-discription ">Your kindness can spark a change,
a small gift can lift a life.
Donate today, inspire tomorrow.</div> } */}
















{/* testimonials ---------------------------------------------------------------------*/}



      
      <div className="background-image mt-7">
        <div className="backgroun-image-head mt-0">
          <h5>Testimonials</h5>
          <h2>Empowering Lives, Enriching Futures</h2>
          <h4>Building a brighter future, together.</h4>
        </div>
      </div>

      {/* <div className="input-head ">
        <h6>Join Us</h6>
        <h3>Sign up to hear from us about our new activities.</h3>
      </div>

      <div className="input-box">
        <form onSubmit={onsubmit} autoComplete='off'>
          <input className='btn1 ' type="text" placeholder='Enter Name' value={name}
            onChange={((e) => (setname(e.target.value)))} />

          <input className="btn2" type='Email' placeholder='Enter Email' value={email}
            onChange={((e) => (setemail(e.target.value)))} />

          <button onClick={onsubmit}>SUBMIT</button>
        </form>
      </div> */}
    </div>
  );
}

export default Home
