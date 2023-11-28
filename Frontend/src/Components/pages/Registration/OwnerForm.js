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
      <h2>Owner Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          O_id:
          <input type="text" name="O_id" value={ownerData.O_id} onChange={handleChange} />
        </label>
        <label>
          Name:
          <input type="text" name="Name" value={ownerData.Name} onChange={handleChange} />
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
