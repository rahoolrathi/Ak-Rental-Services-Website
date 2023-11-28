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

  const generateCRId = () => {
    // Assuming the format "CAR" followed by a unique identifier
    return `CAR${registrationCounter.toString().padStart(7, '0')}`;
  };
  const generateOwnerId = () => {
    // Assuming the format "O" followed by a unique identifier
    return `O${registrationCounter.toString().padStart(9, '0')}`;
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
      const CR_id = generateCRId();
      const O_id=generateOwnerId()
      const carRegistrationResponse = await axios.post('http://localhost:3001/RegisterCar', {
        O_id:O_id ,
        Name: Odata.Name,
        Address: Odata.Address,
        ph_Number: Odata.ph_Number,
        Gender: Odata.Gender,
        Reg_no: carData.Reg_no,
        C_name: carData.C_name,
        Model: carData.Model,
        Available: 'Y',
        Descripton: carData.Descripton,
        Price_Per_Day: carData.Price_Per_Day,
        Transmission: carData.Transmission,
        Mileage: carData.Mileage,
        Int_img: carData.Int_img,
        Ext_img: carData.Ext_img,
        Reg_Year: carData.Reg_Year,
        Color: carData.Color,
        Air_Conditioning: carData.Air_Conditioning,
        Owner_O_id: O_id, // Assuming the owner ID is used here
        CR_id: CR_id,
        Car_Reg_no: carData.Reg_no,
        Doors: carData.Doors,
        Passengers: carData.Passengers,
        Luggage:carData.Luggage,
      });

      console.log('Car Registration Response:', carRegistrationResponse.data);
      navigate('/');

      // Use this response data as needed
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      // Increment the registration counter
      setRegistrationCounter((prevCounter) => prevCounter + 1);
    }
  };

  // Log data when it changes
  console.log(CarData, Odata);

  return (
    <div className="registration-page">
      <br />
      <br />
      {!showCarForm ? (
        <OwnerForm onNext={handleOwnerFormSubmit} />
      ) : (
        <CarForm onBack={handleCarFormBack} datapass={handleCarData} />
      )}
    </div>
  );
};

export default CarRegistration;
