import React from "react";
import AdminCar from "./CarCard";
import "./Dashboard.css"; // Import your CSS file for styling
import RentalList from "./RentalList";
import { useLocation } from "react-router-dom";
import Button from '@mui/material/Button';
import axios from "axios";
import CarForm from "../Registration/CarForm";
import { useState ,useEffect} from "react";

const AdminDashboard = () => {
  const location = useLocation();
  const ownerId  = location.state;
  const [ownerData, setOwnerData] = useState();
  const [CarData, setCarData] = useState(null);
  
const [show,setshow]=useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getOwnerData/${ownerId}`);
        setOwnerData(response.data);
  

      } catch (error) {
        console.error('Error fetching owner data:', error.message);
      }
    };
  
    fetchData();
  }, [ownerId]);
  
// ...
const handleCarFormBack=(down)=>
{
 
  
  let scrollQuantity;
  if(down==1){
    setshow(true)
    setTimeout(() => {
      console.log('Delayed log');
    }, 20000); // Delay for 2 seconds
   scrollQuantity = 800;
   const currentScrollPosition = window.scrollY || window.pageYOffset;

    window.scrollTo({
      top: currentScrollPosition + scrollQuantity,
      behavior: 'smooth', // Optional: Add smooth scrolling behavior
    });
  }
  else
  {
    setshow(false)
   
  }
  
}

const handleCarData = async (carData) => {
  setCarData(carData);

  try {
  
    const O_id=ownerId;

    const formData = new FormData();
    formData.append('O_id', O_id);
    formData.append('Reg_no', carData.Reg_no);
    formData.append('C_name', carData.C_name);
    formData.append('Model', carData.Model);
    formData.append('Available', 'Y');
    formData.append('Descripton', carData.Descripton);
    formData.append('Price_Per_Day', carData.Price_Per_Day);
    formData.append('Transmission', carData.Transmission);
    formData.append('Mileage', carData.Mileage);
    formData.append('file', carData.Int_img);
    formData.append('file', carData.Ext_img);
    formData.append('Reg_Year', carData.Reg_Year);
    formData.append('Color', carData.Color);
    formData.append('Air_Conditioning', carData.Air_Conditioning);
    formData.append('Owner_O_id', O_id);
    formData.append('Car_Reg_no', carData.Reg_no);
    formData.append('Doors', carData.Doors);
    formData.append('Passengers', carData.Passengers);
    formData.append('Luggage', carData.Luggage);

    const carRegistrationResponse = await axios.post('http://localhost:3001/RegisterCarSec', formData);

    console.log('Car Registration Response:', carRegistrationResponse.data);
  } catch (error) {
    console.error('Error:', error.message);
  } 
  
};
return (
  <>
  <div className="dashboard">
    
    <div className="stylish-car-section">
      <h2 className="registered-cars-heading">Registered Cars</h2>
      <br />
      <div className="car-card-container">
        {ownerData && ownerData.cars && ownerData.cars.map((element) => (
          <AdminCar
            Regno={element.Reg_no}
            img={element.Int_img}
            name={element.C_name}
          />
        ))}
        {/* Add more AdminCar components as needed */}
      </div>
      <br />
      <Button onClick={()=>handleCarFormBack(1)} size="large" variant="contained" style={{ marginLeft: '0' }} disableElevation>
      Register Another Car
    </Button>
      <div>
          {ownerData && <RentalList car={ownerData.cars} items={ownerData.rentalRegistrations} />}
        </div>
    </div>
    
  </div>
  <div className="registration-page">
  { show && <CarForm onBack={handleCarFormBack} datapass={handleCarData}  />}
     
    </div>
  </>
);

};

export default AdminDashboard;
