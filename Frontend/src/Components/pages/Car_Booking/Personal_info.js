import React, { useState } from 'react';
import './PersonalInfoForm.css'; // Import the CSS file
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Modal from '../../UI/Model';
const PersonalInfoForm = (props) => {
  const [showM,setshowM]=useState(false);
  const [data,setdata]=useState();
  const handleclose=()=>
{

setshowM(false);
if(data[0]!="Error")
{
  navigate('/');
}

}
  const generateId = () => {
    let counter = 1000;
  
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
          Commision: (0.1 *(props.Price_per_Day * daysDifference)),
          Total_Price: props.Price_per_Day * daysDifference,
          Pick_up_TD: props.pickupDate,
          Drop_off_TD: props.dropoffDate,
          Customer_Cus_id: Cus_id,
          Car_Reg_no: props.regno,
          Reg_id:Reg_id
        });
  
        if(secondResponse.data=== "Rental, Transactions, and availability updated successfully")
        {
            setdata(["Registration Successfull",`Total Bill is ${(props.Price_per_Day * daysDifference)+(0.1 *(props.Price_per_Day * daysDifference))} with 10% AK Servce Tax. \n We will Contact you with in few hours`]);
            setshowM(true);
           
        }
        else{
          setdata(["Error","invalid Credentials"]);
            setshowM(true);
        }
      }
      else{
        setdata(["Error","invalid Credentials"]);
        setshowM(true);
      }
    } catch (error) {
      console.error('Error:', error.message);
      setdata(["Error","invalid Credentials"]);
      setshowM(true);
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
            <label htmlFor="firstName">*First Name</label>
            <input
              type="text"
              id="firstName"
              className="form-input"
              required
              placeholder='Enter Your Name'
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="input-half">
            <label htmlFor="lastName">*Last Name</label>
            <input
              type="text"
              id="lastName"
              className="form-input"
              required
              placeholder='Enter your Last name'
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-group">
          <div className="input-half">
            <label htmlFor="age">*Age</label>
            <input
              type="number"
              id="age"
              placeholder='Enter your Age'
              className="form-input"
              required
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div className="input-half">
            <label htmlFor="phoneNumber">*Phone Number</label>
            <input
              type="tel"
              placeholder='Enter your Phone Number'
              id="phoneNumber"
              className="form-input"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="email">*Email</label>
          <input
            type="email"
            id="email"
            placeholder='Enter your Email'
            className="form-input"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="address">*Address</label>
          <input
            type="text"
            placeholder='Enter your Address'
            id="address"
            className="form-input"
            required
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
  
          <div className="input-half">
            <label htmlFor="country">*Country</label>
            <input
              type="text"
              placeholder='Enter your Country'
              id="country"
              className="form-input"
              required
              value={formData.country}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-group2">
          <label>*Gender</label>
          <div className="radio-group">
            <input
              type="radio"
              id="gender"

              name="gender"
              value="M"
              required 
              checked={formData.gender === 'M'}
              onChange={handleChange}
            />
            <label htmlFor="gender">Male</label>

            <input
              type="radio"
              id="gender"
              name="gender"
              value="F"
              required 
              checked={formData.gender === 'F'}
              onChange={handleChange}
            />
            <label htmlFor="gender">Female</label>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="zipCode">*Zip Code</label>
          <input
            type="number"
            id="zipCode"
            placeholder='Enter your Zip Code'
            className="form-input"
            required
            value={formData.zipCode}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn-Booking">
          Book Now
        </button>
      </form>
      {showM && <Modal Title={data[0]} message={data[1]} handleclose={handleclose} />}
    </div>
  );
};

export default PersonalInfoForm;
