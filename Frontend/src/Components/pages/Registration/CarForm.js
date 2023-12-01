// CarForm.js

import React, { useState } from 'react';
import './CarForm.css';

const CarForm = ({ onBack, datapass }) => {
  const [carData, setCarData] = useState({
    Reg_no: '',
    C_name: '',
    Model: '',
    Available: '',
    Descripton: '',
    Price_Per_Day: '',
    Transmission: '',
    Mileage: '',
    Int_img: null, // Updated to store file object
    Ext_img: null, // Updated to store file object
    Reg_Year: '',
    Color: '',
    Doors: '',
    Passengers: '',
    Luggage: '',
  });

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      // Handle file input separately
      setCarData({
        ...carData,
        [e.target.name]: e.target.files[0], // Assuming only one file is selected
      });
    } else {
      // Handle other input fields
      setCarData({
        ...carData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    datapass(carData);
  };
  return (
    <div className="form-container">
      <h2>Car Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Reg_no:
          <input type="text" name="Reg_no" value={carData.Reg_no} onChange={handleChange} />
        </label>
        <label>
          C_name:
          <input type="text" name="C_name" value={carData.C_name} onChange={handleChange} />
        </label>
        <label>
          Model:
          <input type="text" name="Model" value={carData.Model} onChange={handleChange} />
        </label>
        <label>
          Descripton:
          <input type="text" name="Descripton" value={carData.Descripton} onChange={handleChange} />
        </label>
        <label>
          Price_Per_Day:
          <input type="text" name="Price_Per_Day" value={carData.Price_Per_Day} onChange={handleChange} />
        </label>
        <label>
          Transmission:
          <input type="text" name="Transmission" value={carData.Transmission} onChange={handleChange} />
        </label>
        <label>
          Mileage:
          <input type="text" name="Mileage" value={carData.Mileage} onChange={handleChange} />
        </label>
        <label>
          Interior Image:
          <input type="file" name="Int_img" onChange={handleChange} accept="image/*" />
        </label>

        <label>
          Exterior Image:
          <input type="file" name="Ext_img" onChange={handleChange} accept="image/*" />
        </label>
        <label>
          Reg_Year:
          <input type="text" name="Reg_Year" value={carData.Reg_Year} onChange={handleChange} />
        </label>
        <label>
          Color:
          <input type="text" name="Color" value={carData.Color} onChange={handleChange} />
        </label>

        {/* Additional fields */}
        <label>
          Doors:
          <input type="text" name="Doors" value={carData.Doors} onChange={handleChange} />
        </label>
        <label>
          Passengers:
          <input type="text" name="Passengers" value={carData.Passengers} onChange={handleChange} />
        </label>
        <label>
          Luggage:
          <input type="text" name="Luggage" value={carData.Luggage} onChange={handleChange} />
        </label>
        <label>
          Air Conditioning:
          <div className="radio-group">
            <input
              type="radio"
              id="airConditioningYes"
              name="Air_Conditioning"
              value='Y'
              checked={carData.Air_Conditioning === 'Y'}
              onChange={handleChange}
            />
            <label htmlFor="airConditioningYes">Yes</label>

            <input
              type="radio"
              id="airConditioningNo"
              name="Air_Conditioning"
              value='N'
              checked={carData.Air_Conditioning === 'N'}
              onChange={handleChange}
            />
            <label htmlFor="airConditioningNo">No</label>
          </div>
        </label>
        <button type="submit">Submit Car Data</button>
        <button type="button" onClick={onBack}>
          Back
        </button>
      </form>
    </div>
  );
};

export default CarForm;
