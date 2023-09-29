import React from 'react';
import Civic from "../../../Assets/Civic.png";
import Seat from "../../../Assets/seat.png";
import gear from "../../../Assets/gaer.png";
import time from "../../../Assets/time.png";
import fullday from "../../../Assets/fullday.png";
import './CarCard.css'; // Assuming you have a CSS file for styling

const Car_Card = () => {
  return (
    <div className="car-card">
      <div className="car-info">
        <div className="car-image">
          <img src={Civic} alt="Civic" style={{ width: '400px', height: '100' }} />
        </div>
        <h2 className="model-name">Honda Civic</h2>
        <div className='details-container'>
          <div className="detail">
            <img src={fullday} alt="fullday" /><span>With Driver (10hrs/day) Self Drive (24hrs)</span>
          </div>
          <div className="detail">
            <img src={time} alt="time" /><span>Overtime: PKR 350/hr</span>
          </div>
          <div className="detail_R">
            <img src={Seat} alt="Seat" /><span>4 Seats</span>
          </div>
          <div className="detail_R">
            <img src={gear} alt="Gear" /><span>Automatic</span>
          </div>
        </div>
      </div>

      <div className="price-section">
        <div className="price-detail">
          <h2>8,500/day</h2>
          <button>With Driver</button>
        </div>
        <div className="price-detail">
          <h2>8,000/day</h2>
          <button>Without Driver</button>
        </div>
      </div>

      <div className="view-details">
        View Details
      </div>
    </div>
  );
};

export default Car_Card;
