import Navbar from "../../UI/Navbar";
import ShowCars from "../../UI/ShowCars";
import HomeInfo from "../../UI/Home_Page_info"; // Adjusted component name to camelCase
import Car_Card from '../Search_Car/SC_UI/Car_Card';
import Booking_Form from "../Car_Booking/BookingForm";
import Car_info from "../Car_Booking/Car_info";
import Personal_info from "../Car_Booking/Personal_info";
import User_RegisteredCars from "../Search_Car/User_RegisteredCars";
import BookingPage from '../Car_Booking/Booking_Page'
import CarRegistrationForm from "../Registration/CarRegistration";
import SignInSide from "../owner_SignIn/SignInSide";
import Basic from "../Car_Booking/orderSummary";
import AdminDashboard from "../owner_SignIn/AdminDashboard";

const Home = () => {

  return (
    <>
    {/* <CarRegistrationForm></CarRegistrationForm> */}
  <ShowCars />
   
   <HomeInfo/>   
  

{/* <AdminDashboard/> */}

    

    </>
  );
};

export default Home;

