// OwnerForm.js

import React, { useState } from 'react';
import './OwnerForm.css';

const OwnerForm = ({ onNext }) => {
  const [ownerData, setOwnerData] = useState({
    O_id: '',
    Name: '',
    Address: '',
    ph_Number: '',
    Gender: '',
    password:''
  });

  const handleChange = (e) => {
    setOwnerData({
      ...ownerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    onNext(ownerData);
  };

  return (
    <div className="form-container">
      <h2>Owner Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="Name" value={ownerData.Name} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={ownerData.password} onChange={handleChange} />
        </label>
        <label>
          Address:
          <input type="text" name="Address" value={ownerData.Address} onChange={handleChange} />
        </label>
        <label>
          ph_Number:
          <input type="text" name="ph_Number" value={ownerData.ph_Number} onChange={handleChange} />
        </label>
        <label>
          Gender:
          <input type="text" name="Gender" value={ownerData.Gender} onChange={handleChange} />
        </label>
        <button type="submit">Proceed</button>
      </form>
    </div>
  );
};

export default OwnerForm;
