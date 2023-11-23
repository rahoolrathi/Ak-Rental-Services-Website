import React from 'react';
import './PersonalInfoForm.css';  // Import the CSS file

const PersonalInfoForm = () => {
    return (
        <div className="form-container">
            <form className="form">
                <h2 className="form-title">Personal Information</h2>
                <div className="input-group">
                    <div className="input-half">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" className="form-input" required />
                    </div>
                    <div className="input-half">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" className="form-input" required />
                    </div>
                </div>
                <div className="input-group">
                    <div className="input-half">
                        <label htmlFor="age">Age</label>
                        <input type="number" id="age" className="form-input" required />
                    </div>
                    <div className="input-half">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input type="tel" id="phoneNumber" className="form-input" required />
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="form-input" required />
                </div>
                <div className="input-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" className="form-input" required />
                </div>
                <div className="input-group">
                    <div className="input-half">
                        <label htmlFor="city">City</label>
                        <input type="text" id="city" className="form-input" required />
                    </div>
                    <div className="input-half">
                        <label htmlFor="country">Country</label>
                        <input type="text" id="country" className="form-input" required />
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="zipCode">Zip Code</label>
                    <input type="number" id="zipCode" className="form-input" required />
                </div>
                <button type="submit" className="form-button">Book Now</button>
            </form>
        </div>
    );
}

export default PersonalInfoForm;
