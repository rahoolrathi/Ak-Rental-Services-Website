import logo from "./logo.svg";
import "./App.css";
import { Fragment } from "react";

import Home from "./Components/pages/home/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Change import
import User_RegisteredCars from "./Components/pages/Search_Car/User_RegisteredCars";
import CarRegistration from "./Components/pages/Registration/CarRegistration"; 
import Navbar from "./Components/UI/Navbar";

function App() {
  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/rent' element={<User_RegisteredCars/>} />
        <Route path="/Register" element={<CarRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;

