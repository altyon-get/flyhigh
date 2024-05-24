import PropTypes from "prop-types";

const Navbar = ({ setActiveComponent }) => {
  return (
    <div className="navbar">
      <button onClick={() => setActiveComponent("allFlight")}>
        All Flights ✈️
      </button>
      <button onClick={() => setActiveComponent("controlPanel")}>
        Control Panel 🎛️
      </button>
      <button onClick={() => setActiveComponent("flightSchedule")}>
        Flight Schedule 🗓️
      </button>
      <button onClick={() => setActiveComponent("weatherForecast")}>
        Adjust weather ⚙️
      </button>
    </div>
  );
};

Navbar.propTypes = {
  setActiveComponent: PropTypes.func.isRequired,
};

export default Navbar;
