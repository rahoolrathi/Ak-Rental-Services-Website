// User_RegisteredCars.js

import Car_Card from "./SC_UI/Car_Card";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Civic from '../../Assets/Civic.png';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './SC_UI/User_RegisteredCars.css';

const User_RegisteredCars = () => {
  const [carData, Set_Data] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/');
        Set_Data(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Box sx={{ textAlign: 'center', padding: '20px' }}>
        <Typography variant="h2" sx={{ fontWeight: 'bold', marginBottom: '20px', animation: 'fadeIn 2s ease-in-out' }}>
          User Registered Cars for Rent
        </Typography>
      </Box>
      <div className="car-cards-container">
        <Box sx={{ width: '100%', marginTop: '50px' }}>
          <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {carData.map((car, index) => (
              <Grid key={car.Reg_no} item xs={12} sm={6}>
                <Car_Card 
                Reg_no={car.Reg_no}
                  C_name={car.C_name}
                  Model={car.Model}
                  Transmission={car.Transmission}
                  Seats='4'
                  Price_Per_Day={car.Price_Per_Day}
                  Description={car.Descripton}
                  Color={car.Color}
                  img={car.Int_img}
                  ImageSrc={require(`../../Assets/${car.Int_img}`)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default User_RegisteredCars;
