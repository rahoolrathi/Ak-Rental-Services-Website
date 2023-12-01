import React, { useState } from 'react';
import OwnerForm from './OwnerForm';
import CarForm from './CarForm';
import './CarRegistration.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const CarRegistration = () => {
  const navigate=useNavigate();
  const [showCarForm, setShowCarForm] = useState(false);
  const [Odata, setOdata] = useState(null);
  const [CarData, setCarData] = useState(null);
  const [registrationCounter, setRegistrationCounter] = useState(1);


  const generateOwnerId = () => {
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
  
  const handleOwnerFormSubmit = (OwnerData) => {
    setOdata(OwnerData);
    setShowCarForm(true);
  };

  const handleCarFormBack = () => {
    setShowCarForm(false);
  };

  const handleCarData = async (carData) => {
    setCarData(carData);
  
    try {
    
      const O_id = generateOwnerId();
  
      const formData = new FormData();
      formData.append('O_id', O_id);
      formData.append('Name', Odata.Name);
      formData.append('password', Odata.password);
      formData.append('Address', Odata.Address);
      formData.append('ph_Number', Odata.ph_Number);
      formData.append('Gender', Odata.Gender);
      formData.append('Reg_no', carData.Reg_no);
      formData.append('C_name', carData.C_name);
      formData.append('Model', carData.Model);
      formData.append('Available', 'Y');
      formData.append('Descripton', carData.Descripton);
      formData.append('Price_Per_Day', carData.Price_Per_Day);
      formData.append('Transmission', carData.Transmission);
      formData.append('Mileage', carData.Mileage);
      formData.append('file', carData.Int_img);
      formData.append('file', carData.Ext_img);
      formData.append('Reg_Year', carData.Reg_Year);
      formData.append('Color', carData.Color);
      formData.append('Air_Conditioning', carData.Air_Conditioning);
      formData.append('Owner_O_id', O_id);
      formData.append('Car_Reg_no', carData.Reg_no);
      formData.append('Doors', carData.Doors);
      formData.append('Passengers', carData.Passengers);
      formData.append('Luggage', carData.Luggage);
  
      const carRegistrationResponse = await axios.post('http://localhost:3001/RegisterCar', formData);
  
      console.log('Car Registration Response:', carRegistrationResponse.data);
      navigate('/');
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setRegistrationCounter((prevCounter) => prevCounter + 1);
    }
  };
  
  // Log data when it changes
  console.log(CarData, Odata);

  return (
    <div className="registration-page">
      <br />
      <br />
      {!showCarForm ?
       (
        <OwnerForm onNext={handleOwnerFormSubmit} />
      ) : (
        <CarForm onBack={handleCarFormBack} datapass={handleCarData} />
      )}
    </div>
  );
};

export default CarRegistration;
