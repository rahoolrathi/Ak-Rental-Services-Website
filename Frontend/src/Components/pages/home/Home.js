import Navbar from "../../UI/Navbar";
import ShowCars from "../../UI/ShowCars";
import HomeInfo from "../../UI/Home_Page_info"; // Adjusted component name to camelCase
import Car_Card from '../Search_Car/SC_UI/Car_Card';
import Booking_Form from "../../UI/Book_A_Car";
import Car_info from "../Car_Booking/Car_info";
import Personal_info from "../Car_Booking/Personal_info";
import User_RegisteredCars from "../Search_Car/User_RegisteredCars";
const Home = () => {
  return (
    <>
      <Navbar />



    {/* <User_RegisteredCars/> */}
    <ShowCars />
   
   
    {/* <Personal_info/> */}
    

    </>
  );
};

export default Home;

