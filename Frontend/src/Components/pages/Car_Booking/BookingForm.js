import React, { useState } from "react";
import "./BookingForm.css";
import PersonalInfoForm from "./Personal_info";
import Booking_Car_info from "./Booking_Car_Details";

const Booking_Form = (props) => {
  const [selectedCar, setSelectedCar] = useState(props.C_name);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [show, setShow] = useState(false);

  const handlePickupDateChange = (event) => {
    setPickupDate(event.target.value);
  };

  const handlePickupTimeChange = (event) => {
    setPickupTime(event.target.value);
  };

  const handleDropoffDateChange = (event) => {
    setDropoffDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the selected data (selectedCar, pickupDate, pickupTime, dropoffDate)
    // For now, logging to the console:
    console.log('Booking Details:', {
      selectedCar,
      pickupDate,
      pickupTime,
      dropoffDate,
   
    });
  };

  return (
    <>
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-title">
          <h2>BOOK A CAR TODAY</h2>
        </div>
        <div className="form-group">
          <label htmlFor="carSelect">Car Model:</label>
          <input
            type="text"
            value={props.C_name}
            readOnly
            className="model-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="pickupDateInput">Pick-up Date:</label>
          <input
            type="date"
            value={pickupDate}
            onChange={handlePickupDateChange}
            id="pickupDateInput"
          />
        </div>
        <div className="form-group">
          <label htmlFor="pickupTimeSelect">Pick-up Time:</label>
          <select
            id="pickupTimeSelect"
            value={pickupTime}
            onChange={handlePickupTimeChange}
          >
            <option></option>
            <option value="10:00">10:00 AM</option>
    <option value="11:00">11:00 AM</option>
    <option value="12:00">12:00 PM</option>
    <option value="13:00">01:00 PM</option>
    <option value="14:00">02:00 PM</option>
    <option value="15:00">03:00 PM</option>
    <option value="16:00">04:00 PM</option>
    <option value="17:00">05:00 PM</option>
    <option value="18:00">06:00 PM</option>
    <option value="19:00">07:00 PM</option>
    <option value="20:00">08:00 PM</option>
    <option value="21:00">09:00 PM</option>
    <option value="22:00">10:00 PM</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dropoffDateInput">Drop-off Date:</label>
          <input
            type="date"
            value={dropoffDate}
            onChange={handleDropoffDateChange}
            id="dropoffDateInput"
          />
        </div>

        <button
          type="submit"
          onClick={() => {
            setShow(true);
          }}
        >
          Continue Booking
        </button>
      </form>
      <br />

      {show && (
        <div>
          {' '}
          <Booking_Car_info
            C_name={props.C_name}
            Price_per_Day={props.Price_Per_Day}
            pickupDate={pickupDate}
            pickupTime={pickupTime}
            dropoffDate={dropoffDate}
            ImageSrc={props.ImageSrc}
          />
          <br></br>
          <PersonalInfoForm
            regno={props.Reg_no}
            pickupDate={pickupDate}
            pickupTime={pickupTime}
            dropoffDate={dropoffDate}
            Price_per_Day={props.Price_Per_Day}
          />
        </div>
      )}
    </>
  );
};

export default Booking_Form;
