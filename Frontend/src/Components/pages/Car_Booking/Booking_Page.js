import Booking_Form from "./BookingForm";
import { useLocation } from "react-router-dom";

const BookingPage = () => {
  var location = useLocation();
  console.log(location.state); // Accessing the state object

  // Check if location.state is not null before accessing its properties
  const { Reg_no, C_name, Price_Per_Day,img } = location.state || {};
console.log(img);
  return (
    <Booking_Form
      // Pass the state properties as props to Booking_Form component
      Reg_no={Reg_no}
      C_name={C_name}
      Price_Per_Day={Price_Per_Day}
      ImageSrc={img}
    />
  );
};

export default BookingPage;
