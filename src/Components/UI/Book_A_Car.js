import React from "react";
import "./BookingForm.css";

const Booking_Form = () => {
  return (
    <>
      <form className="booking-form">
        <div className="form-title">
          <h2>BOOK A CAR TODAY</h2>
        </div>
        <div className="form-group">
          <label htmlFor="carSelect">Car Model:</label>
          <select id="carSelect">
            <option value="15">Toyota Corolla</option>
            <option value="2547">Toyota Revo</option>
            <option value="2544">Toyota Prado</option>
            <option value="14">Suzuki Alto</option>
            <option value="2543">Honda BRV</option>
            <option value="13">Honda Civic</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="pickupSelect">Pickup Location:</label>
          <select id="pickupSelect">
            <option value="karachi">Karachi</option>
            <option value="hyderabad">Hyderabad</option>
            <option value="larkana">Larkana</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dateInput">Date:</label>
          <input type="date" id="dateInput" />
        </div>
        <div className="form-group">
          <label htmlFor="timeSelect">Time:</label>
          <select id="timeSelect">
            <option value="09.00">09.00 AM to 10.00 AM</option>
          </select>
        </div>
        <button type="submit">Continue Booking</button>
      </form>
    </>
  );
};

export default Booking_Form;
