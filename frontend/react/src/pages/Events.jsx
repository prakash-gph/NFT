import React from 'react'
import "./Events.css"
const Events = () => {
  return (
    <div>
      <div className="eventhead">
      <h1>Events</h1>
      </div>
      

      <div className="first-container">
        <hr></hr>
        <div className="f-container">
          <img src='images/Yoga.jpeg' alt='images'></img>
           <div className="f-container-heading">
            <h2>The International Day of Yoga </h2>
            <p>Team: Nation's First Trust 
               </p>
            <p>Date:  21-06-2025</p>
            {/* <p>Class Timings: 6:15 am to 7:15 am (Morning)</p> */}
            {/* <p>Age Limit: 10 Yrs above</p> */}
           </div>
        </div>
        <hr></hr>

        {/* <div className="f-container">
          <img src='images/6.svg' alt='images'></img>
           <div className="f-container-heading">
            <h2>Vishnu Sahasranama Online Class</h2>
            <p>Batch: 17</p>
            <p>Date:  16/12/2024 to 14/01/2025</p>
            <p>Class Timings: 6:15 am to 7:15 am (Morning)</p>
            <p>Age Limit: 10 Yrs above</p>
           </div>
        </div> */}
      

        {/* <div className="f-container">
          <img src='images/7.svg' alt='images'></img>
           <div className="f-container-heading">
            <h2>Vishnu Sahasranama Online Class</h2>
            <p>Batch: 17</p>
            <p>Date:  16/12/2024 to 14/01/2025</p>
            <p>Class Timings: 6:15 am to 7:15 am (Morning)</p>
            <p>Age Limit: 10 Yrs above</p>
           </div>
        </div> */}
      </div>
    </div>
  )
}

export default Events
