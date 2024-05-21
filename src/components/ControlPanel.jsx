import { useState } from "react";
import handleStartFlight from "../services/handleStartFlight";
import handleStopFlight from "../services/handleStopFlight";

const ControlPanel = () => {
  const [flightName, setFlightName] = useState("");

  const handleInputChange = (e) => {
    setFlightName(e.target.value);
  };

  return (
    <div className="control-panel">
      <h2>Control Panel</h2>
      <div className="input-group">
        <label className="input-label">Flight Name:</label>
        <input
          type="text"
          value={flightName}
          onChange={handleInputChange}
          className="input-field"
        />
      </div>
      <div>
        <button
          onClick={() => handleStartFlight(flightName)}
          className="start-button"
        >
          Start Flight
        </button>
        <button
          onClick={() => handleStopFlight(flightName)}
          className="stop-button"
        >
          Stop Flight
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
