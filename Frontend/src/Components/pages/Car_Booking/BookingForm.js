import React, { useState } from "react";
import Car_info from "./Car_info";
import "./BookingForm.css";
import PersonalInfoForm from "./Personal_info";
const Booking_Form = (props) => {
  const [selectedCar, setSelectedCar] = useState(props.C_name);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [show,setShow]=useState(false);



  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the selected data (selectedCar, selectedDate, selectedTime)
  };

  return (
    <>
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-title">
          <h2>BOOK A CAR TODAY</h2>
        </div>
        <div className="form-group">
          <label htmlFor="carSelect">Car Model:</label>
        </div>

        <div className="form-group">
          <label htmlFor="dateInput">Date:</label>
          <input type="date" value={selectedDate} onChange={handleDateChange} id="dateInput" />
        </div>
        <div className="form-group">
          <label htmlFor="timeSelect">Time:</label>
          <select id="timeSelect" value={selectedTime} onChange={handleTimeChange}>
            <option value="09.00">09.00 AM to 10.00 AM</option>
          </select>
        </div>
        <button type="submit" onClick={()=>
        {
          setShow(true)
        }}>Continue Booking</button>
      </form>
{show && <div> <Car_info/>
 <PersonalInfoForm/>
 </div>
 }
    </>
  );
};

export default Booking_Form;
