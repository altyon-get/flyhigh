// src/App.jsx
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Grid from "./components/Grid";
// import Page1 from "./components/Page1";
// import Page2 from "./components/Page2";
import Controller from './components/Controller';
import "./App.css";

function App() {
  return (
    <>
      <header>Flight Navigation System</header>
      <div className="main-container">
        <div className="grid-container">
          <Grid />
        </div>
        <div className="second-component">
          <Controller />
        </div>
      </div>
    </>
  );
}

export default App;
