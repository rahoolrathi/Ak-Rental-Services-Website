import React, { useState } from 'react';
import OwnerForm from './OwnerForm';
import CarForm from './CarForm';
import './CarRegistration.css';

const CarRegistration = () => {
  const [showCarForm, setShowCarForm] = useState(false);
  const [Odata, setOdata] = useState(null);
  const [CarData, setCarData] = useState(null);

  const handleOwnerFormSubmit = (OwnerData) => {
    setOdata(OwnerData);
    setShowCarForm(true);
  };

  const handleCarFormBack = () => {
    setShowCarForm(false);
  };

  const handleCarData = (carData) => {
    setCarData(carData);
  };

  // Log data when it changes
  console.log(CarData, Odata);

  return (
    <div className="registration-page">
      <br></br>
      <br></br>
      {!showCarForm ? (
        <OwnerForm onNext={handleOwnerFormSubmit} />
      ) : (
        <CarForm onBack={handleCarFormBack} datapass={handleCarData} />
      )}
    </div>
  );
};

export default CarRegistration;
