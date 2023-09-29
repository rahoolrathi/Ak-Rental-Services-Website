import React from 'react';
import Civic_img from '../Assets/Civic.png';

const Showcar = () => {
    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'red',
        padding: '20px',
    };

    const bookingInfoStyle = {
        textAlign: 'left',
        color: 'white',
        fontSize: '1.5rem',
    };

    const imageStyle = {
        textAlign: 'center',
    };

    const insideInfoStyle = {
        textAlign: 'right',
        color: 'white',
        fontSize: '1rem',
    };

    const headingStyle = {
        fontSize: '3rem',
    };

    return (
        <div className="Vehicle model">
            <h1 style={headingStyle}>Vehicle Model</h1>
            <br />
            <div style={containerStyle}>
                <div className="booking_info" style={bookingInfoStyle}>
                    <div>HONDA CIVIC</div>
                    <div>15000</div>
                    <button>Reserve Now</button>
                </div>
                <div className="img" style={imageStyle}>
                    <img src={Civic_img} alt="Civic" />
                </div>
                <div className="inside info" style={insideInfoStyle}>
                    <div>Doors: 4</div>
                    <div>passenger: 7</div>
                    <div>laguage: 2</div>
                    <div>transmission: Automatic</div>
                    <div>Air Condition: yes</div>
                </div>
            </div>
        </div>
    );
};

export default Showcar;
