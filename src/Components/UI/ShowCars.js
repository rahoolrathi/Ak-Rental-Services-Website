import React from 'react';
import Civic_img from '../Assets/Civic.png';
import './Showcar.css';

const Showcar = () => {

    return (
        <div className="showcar-container">
            <div className="vehicle-model">
                <h1 className="heading">Honda Civic</h1>
                <div className="container">
                    <div className="booking-info">
                        <div className="info-item">Price: $15,000</div>
                        <button className="reserve-button">Reserve Now</button>
                    </div>
                    <div className="image">
                        <img src={Civic_img} alt="Civic" />
                    </div>
                    <div className="inside-info">
                        <div className="info-item">Doors: 4</div>
                        <div className="info-item">Passengers: 7</div>
                        <div className="info-item">Luggage: 2</div>
                        <div className="info-item">Transmission: Automatic</div>
                        <div className="info-item">Air Condition: Yes</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Showcar;
