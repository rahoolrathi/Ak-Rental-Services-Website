import React from "react";
import Civic from '../../Assets/Civic.png';
import "./BookingCarInfo.css"; // Create a CSS file for styling


const Booking_Car_info = (props) => {
  console.log(props.selectedTime)
  return (
    <div className="booking-car-info-container">
      <div className="booking-box">
        <div className="car-info">
          <div className="car-name">{props.C_name}</div>
          <div className="car-price">{`RS: ${props.Price_per_Day}/DAY`}</div>
          <div className="date-of-booking">
            {`(${props.pickupDate} — ${props.pickupTime}) To (${props.dropoffDate} - ${props.pickupTime})`}
          </div>

        </div>

        <div className="car-image">
          <img src={require(`../../Assets/${props.Int_img}`)} alt="Car_img" />
        </div>
      </div>
    </div>
  );
};

export default Booking_Car_info;
