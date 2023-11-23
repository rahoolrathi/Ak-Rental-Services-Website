import logo from "./logo.svg";
import "./App.css";
import { Fragment } from "react";
import Home from "./Components/pages/home/Home";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Fragment>
      <Home/>
    </Fragment>
  );
}

export default App;
