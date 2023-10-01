import Navbar from "../../UI/Navbar";
import ShowCars from "../../UI/ShowCars";
import HomeInfo from "../../UI/Home_Page_info"; // Adjusted component name to camelCase
import Car_Card from '../Search_Car/SC_UI/Car_Card';
import Booking_Form from "../../UI/Book_A_Car";
const Home = () => {
  return (
    <>
      <Navbar />
      {/* <Car_Card/> */}

      <ShowCars />
      <Booking_Form/>
      <HomeInfo /> 

    </>
  );
};

export default Home;

