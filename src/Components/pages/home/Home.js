import Navbar from "../../UI/Navbar";
import ShowCars from "../../UI/ShowCars";
import HomeInfo from "../../UI/Home_Page_info"; // Adjusted component name to camelCase
import Car_Card from '../Search_Car/SC_UI/Car_Card';
const Home = () => {
  return (
    <>
      <Navbar />
      <Car_Card/>
      {/* <ShowCars /> */}
      {/* <HomeInfo />  */}
    </>
  );
};

export default Home;

