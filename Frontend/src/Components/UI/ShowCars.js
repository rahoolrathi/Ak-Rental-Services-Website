import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import Civic_img from '../Assets/Civic.png';
import './Showcar.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper/core';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Booking_Form from '../pages/Car_Booking/BookingForm';


// Install Swiper modules
import { useNavigate } from 'react-router-dom';
SwiperCore.use([Navigation]);

const Showcar = () => {
  var navigate=useNavigate();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    Reg_no: '',
    C_name: '',
    Price_Per_Day: '',
    Int_img:''
  });
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const NavigatetoBooking = (Reg_no, C_name, Price_Per_Day,Int_img) => {
    const img=Int_img;
    const newData = { Reg_no, C_name, Price_Per_Day,img };
    setFormData(newData);
    navigate('/Bookingpage', { state: newData });
  };
  

  return (
    <Fragment>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
      >
        <div className="showcar-container">
          {Data.map((item) => (
            <SwiperSlide key={item.Reg_no}>
              <div className="vehicle-model">
                <h1 className="heading">{item.C_name}</h1>
                <div className="container">
                  <div className="booking-info">
                    <div className="info-item">
                      <p>{`Car Name: ${item.C_name}`}</p>
                      <p>{`Model: ${item.Model}`}</p>
                      <p>{`Price: ${item.Price_Per_Day}`}</p>
                    </div>
                    <button
  className="reserve-button"
  onClick={() => NavigatetoBooking(item.Reg_no, item.C_name, item.Price_Per_Day,item.Int_img)}
>
  Reserve Now
</button>

                  </div>
                  <div className="image">
                  <img src={require(`../Assets/${item.Int_img}`)} alt="Civic" />
                  </div>
                
                  <div className="inside-info">
                    <div className="info-item">{`Doors: ${item.Doors}`}</div>
                    <div className="info-item">{`Passengers: ${item.Passengers}`}</div>
                    <div className="info-item">{`Luggage: ${item.Luggage}`}</div>
                    <div className="info-item">{`Transmission: ${item.Transmission}`}</div>
                    <div className="info-item">{`Air Condition: ${item.AC}`}</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>

  
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
      
    </Fragment>
  );
};

export default Showcar;
