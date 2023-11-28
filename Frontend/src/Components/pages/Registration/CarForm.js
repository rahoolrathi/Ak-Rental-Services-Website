// CarForm.js

import React, { useState } from 'react';
import './CarForm.css';

const CarForm = ({ onBack ,datapass}) => {
  const [carData, setCarData] = useState({
    Reg_no: '',
    C_name: '',
    Model: '',
    Available: '',
    Descripton: '',
    Price_Per_Day: '',
    Transmission: '',
    Mileage: '',
    Int_img: '',
    Ext_img: '',
    Reg_Year: '',
    Color: '',
  });

  const handleChange = (e) => {
    setCarData({
      ...carData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    datapass(carData)

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
          Available:
          <input type="text" name="Available" value={carData.Available} onChange={handleChange} />
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
          Int_img:
          <input type="text" name="Int_img" value={carData.Int_img} onChange={handleChange} />
        </label>
        <label>
          Ext_img:
          <input type="text" name="Ext_img" value={carData.Ext_img} onChange={handleChange} />
        </label>
        <label>
          Reg_Year:
          <input type="text" name="Reg_Year" value={carData.Reg_Year} onChange={handleChange} />
        </label>
        <label>
          Color:
          <input type="text" name="Color" value={carData.Color} onChange={handleChange} />
        </label>
        <button type="submit">Submit Car Data</button>
        <button type="button" onClick={onBack}>Back</button>
      </form>
    </div>
  );
};

export default CarForm;