import { useState } from "react";
import Navbar from "./Navbar";
// import Grid from './Grid';
import ControlPanel from "./ControlPanel";
import ScheduleFlight from "./ScheduleFlight";
import "../assets/styles/Controller.css";
import AllFlights from "./AllFlights";
import WeatherForm from "./WeatherForm";

const Controller = () => {
  const [activeComponent, setActiveComponent] = useState("allFlight");

  const renderComponent = () => {
    switch (activeComponent) {
      case "allFlight":
        return <AllFlights />;
      case "controlPanel":
        return <ControlPanel />;
      case "flightSchedule":
        return <ScheduleFlight />;
      case "weatherForecast":
        return <WeatherForm />;
    }
  };

  return (
    <div>
      <Navbar setActiveComponent={setActiveComponent} />
      <div>{renderComponent()}</div>
    </div>
  );
};

export default Controller;
