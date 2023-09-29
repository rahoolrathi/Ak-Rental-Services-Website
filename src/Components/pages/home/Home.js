import Navbar from "../../UI/Navbar";
import ShowCars from "../../UI/ShowCars";
import HomeInfo from "../../UI/Home_Page_info"; // Adjusted component name to camelCase

const Home = () => {
  return (
    <>
      <Navbar />
      <ShowCars />
      <HomeInfo /> 
    </>
  );
};

export default Home;

