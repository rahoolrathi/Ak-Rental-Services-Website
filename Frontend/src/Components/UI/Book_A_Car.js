import React, { useState } from "react";
import Car_info from "../pages/Car_Booking/Car_info";
import "./BookingForm.css";
import PersonalInfoForm from "../pages/Car_Booking/Personal_info";
const Booking_Form = (props) => {
  const [selectedCar, setSelectedCar] = useState(props.C_name);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [show,setShow]=useState(false);

  const handleCarChange = (event) => {
    setSelectedCar(event.target.value);
  };

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
          <select id="carSelect" value={selectedCar} onChange={handleCarChange}>
            <option value="Toyota Corolla">Toyota Corolla</option>
            <option value="Toyota Revo">Toyota Revo</option>
            <option value="Toyota Prado">Toyota Prado</option>
            <option value="Suzuki Alto">Suzuki Alto</option>
            <option value="Honda BRV">Honda BRV</option>
            <option value='Honda Civic'>Honda Civic</option>
          </select>
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
