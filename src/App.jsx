// src/App.jsx
// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import FlightSchedule from './components/FlightSchedule';
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Grid />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/schedule-flight" element={<FlightSchedule />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
