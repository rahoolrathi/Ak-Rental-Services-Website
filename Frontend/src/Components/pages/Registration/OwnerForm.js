import React, { useState } from 'react';
import './OwnerForm.css';
import Modal from '../../UI/Model';

const OwnerForm = ({ onNext }) => {
  const [show, setshow] = useState(false);
  const [ownerData, setOwnerData] = useState({
    O_id: '',
    Name: '',
    Address: '',
    ph_Number: '',
    Gender: '',
    password: '',
  });

  const handleChange = (e) => {
    setOwnerData({
      ...ownerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if required fields are not empty
    if (!ownerData.Name || !ownerData.password || !ownerData.Address || !ownerData.ph_Number || !ownerData.Gender) {
      // Display an error message or modal
      setshow(true);
      return;
    }
  
    // Check if the password meets the length requirement
    if (ownerData.password.length < 8) {
      // Display an error message or modal for password length constraint
      setshow(true);
      return;
    }
  
    // Check if the password is not equal to "-1"
    if (ownerData.password === "-1") {
      // Display an error message or modal for the specific password constraint
      setshow(true);
      return;
    }
  
    // Proceed to the next step
    onNext(ownerData);
  };
  
  const handleclose = () => {
    setshow(false);
  };

  return (
    <div className="form-container">
      <h2 className="form-heading" >Owner Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" style={{ color: 'black' }} name="Name" value={ownerData.Name} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" style={{ color: 'black' }} name="password" value={ownerData.password} onChange={handleChange} />
        </label>
        <label>
          Address:
          <input type="text" style={{ color: 'black' }} name="Address" value={ownerData.Address} onChange={handleChange} />
        </label>
        <label>
          ph_Number:
          <input type="text" style={{ color: 'black' }} name="ph_Number" value={ownerData.ph_Number} onChange={handleChange} />
        </label>
        <label>
          Gender:
          <div>
            <label>
              <input type="radio" name="Gender" value="M" checked={ownerData.Gender === 'M'} onChange={handleChange} />
              Male
            </label>
            <label>
              <input type="radio" name="Gender" value="F" checked={ownerData.Gender === 'F'} onChange={handleChange} />
              Female
            </label>
          </div>
        </label>
        <button type="submit">Proceed</button>
      </form>
     {show && <Modal Title="Error" message="Invalid Credentials" handleclose={handleclose} />}
    </div>
  );
};

export default OwnerForm;
