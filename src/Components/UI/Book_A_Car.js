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
        
    <option value="Toyota Corolla">Toyota Corolla</option>
    <option value="Toyota Revo">Toyota Revo</option>
    <option value="Toyota Prado">Toyota Prado</option>
    <option value="Suzuki Alto">Suzuki Alto</option>
    <option value="Honda BRV">Honda BRV</option>
    <option value="Honda Civic">Honda Civic</option>


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
