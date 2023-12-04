
import React from 'react';
import Civic from "../../../Assets/Civic.png";
import Seat from "../../../Assets/seat.png";
import gear from "../../../Assets/gaer.png";
import time from "../../../Assets/time.png";
import fullday from "../../../Assets/fullday.png";

import './CarCard.css'; // Assuming you have a CSS file for styling
import { useNavigate } from 'react-router-dom';

const Car_Card = (props) => {
  const navigate=useNavigate();
  var {
    Reg_no,
    C_name,
    Model,
    Transmission,
    Seats,
    Price_Per_Day,
    Description,
    Color,
    img,
    ImageSrc, // Add a new prop for the image source
  } = props;
  const NavigatetoBooking = (Driver) => {
    if(Driver)
    {
      Price_Per_Day=Price_Per_Day+500;
    }
        
    const newData = { Reg_no, C_name, Price_Per_Day,img};

    navigate('/Bookingpage', { state: newData });
  };
  console.log(img)
  
  return (
    <div className="car-card">
      <div className="car-info">
        <div className="car-image">
          <img src={ImageSrc} alt={C_name} style={{ width: '400px', height: '100' }} />
        </div>
        <h2 className="model-name">{C_name}</h2>
        <div className='details-container'>
        <div className="detail">
  <img className="icon" src={fullday} alt="fullday" />
  <span>With Driver (10hrs/day) Self Drive (24hrs)</span>
</div>
<div className="detail">
  <img className="icon" src={time} alt="time" />
  <span>Overtime: PKR 350/hr</span>
</div>
<div className="detail_R">
  <img className="icon" src={Seat} alt="Seat" />
  <span>{`${Seats} Seats`}</span>
</div>
<div className="detail_R">
  <img className="icon" src={gear} alt="Gear" />
  <span>{Transmission}</span>
</div>

        </div>
      </div>

      <div className="price-section">
        <div className="price-detail">
          <h2>{`${Price_Per_Day+500}/day`}</h2>
          <button onClick={() => NavigatetoBooking(true)}>With Driver</button>
        </div>
        <div className="price-detail">
          <h2>{`${Price_Per_Day }/day`}</h2>
          <button onClick={() => NavigatetoBooking(false)}>Without Driver</button>
        </div>
      </div>

     
    </div>
  );
};

export default Car_Card;
