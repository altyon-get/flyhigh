import { useState } from "react";
import { useSocket } from "../context/SocketContext";
import handleStartFlight from "../services/handleStartFlight";
import handleStopFlight from "../services/handleStopFlight";
import "../assets/styles/ControlPanel.css";

const ControlPanel = () => {
  const [flightName, setFlightName] = useState("");
  const { response , planeIds} = useSocket();

  const handleInputChange = (e) => {
    setFlightName(e.target.value);
  };

  return (
    <div className="control-panel">
      <h2>Search Flight</h2>
      <div className="input-group">
        <select
          value={flightName}
          onChange={(e) => setFlightName(e.target.value)}
          required
        >
          <option value="">Select Plane</option>
          {planeIds && planeIds.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
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
