import React, { useState } from 'react';
import './PersonalInfoForm.css'; // Import the CSS file
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
const PersonalInfoForm = (props) => {
  const generateId = () => {
    let counter = 1;
  
    // Read counter value from localStorage
    const counterString = localStorage.getItem('counter');
    counter = parseInt(counterString) || 1;
  
    // Increment the counter
    const newCounter = counter + 1;
  
    // Write the updated counter back to localStorage
    localStorage.setItem('counter', newCounter.toString());
  
    // Return the generated owner ID
    return newCounter;
  };
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    gender: ''
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const Cus_id=generateId();
    const Reg_id=generateId();
  
    try {
      // Calculate the number of days between pickup and drop-off
      const pickupDate = new Date(props.pickupDate);
      const dropoffDate = new Date(props.dropoffDate);
      const timeDifference = dropoffDate - pickupDate;
      const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  
      // First POST request to /customer
      const customerResponse = await axios.post('http://localhost:3001/customer', {
        Cus_id:Cus_id,
        Name: `${formData.firstName} ${formData.lastName}`,
        Address: formData.address,
        ph_Number: formData.phoneNumber,
        Age: formData.age,
        Zip_code: formData.zipCode,
        Gender: formData.gender,
      });
  
      console.log('Customer Response:', customerResponse.data[0]);
  
      if (customerResponse.data[0] === 'Customer Inserted Successfully') {
        console.log("price " +props.Price_per_Day);
        // Second POST request with data from props
        console.log("Car"+props.regno);
        const secondResponse = await axios.post('http://localhost:3001/rental', {
          Days: daysDifference,
          Commision: 10,
          Total_Price: props.Price_per_Day * daysDifference,
          Pick_up_TD: props.pickupDate,
          Drop_off_TD: props.dropoffDate,
          Customer_Cus_id: Cus_id,
          Car_Reg_no: props.regno,
          Reg_id:Reg_id
        });
  
        if(secondResponse.data=== "Rental, Transactions, and availability updated successfully")
        {
            navigate('/');
        }
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form-title">Personal Information</h2>
        <div className="input-group">
          <div className="input-half">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              className="form-input"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="input-half">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="form-input"
              required
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-group">
          <div className="input-half">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              className="form-input"
              required
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div className="input-half">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              className="form-input"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-input"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            className="form-input"
            required
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <div className="input-half">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              className="form-input"
              required
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="input-half">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              className="form-input"
              required
              value={formData.country}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-group">
          <label>Gender</label>
          <div className="radio-group">
            <input
              type="radio"
              id="gender"
              name="gender"
              value="M"
              checked={formData.gender === 'M'}
              onChange={handleChange}
            />
            <label htmlFor="gender">Male</label>

            <input
              type="radio"
              id="gender"
              name="gender"
              value="F"
              checked={formData.gender === 'F'}
              onChange={handleChange}
            />
            <label htmlFor="gender">Female</label>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="zipCode">Zip Code</label>
          <input
            type="number"
            id="zipCode"
            className="form-input"
            required
            value={formData.zipCode}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="form-button">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
