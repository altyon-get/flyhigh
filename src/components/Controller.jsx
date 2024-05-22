import { useState } from "react";
import Navbar from "./Navbar";
// import Grid from './Grid';
import ControlPanel from "./ControlPanel";
import ScheduleFlight from "./ScheduleFlight";
import "../assets/styles/Controller.css";
import AllFlights from "./AllFlights";

const Controller = () => {
  const [activeComponent, setActiveComponent] = useState("controlPanel");

  const renderComponent = () => {
    switch (activeComponent) {
      case "allFlight":
        return <AllFlights />;
      case "controlPanel":
        return <ControlPanel />;
      case "flightSchedule":
        return <ScheduleFlight />;
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
