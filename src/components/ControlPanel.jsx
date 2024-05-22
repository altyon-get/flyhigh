import { useState, useEffect, useRef } from "react";
import { useSocket } from "../context/SocketContext";
import handleStartFlight from "../services/handleStartFlight";
import handleStopFlight from "../services/handleStopFlight";
import "../assets/styles/ControlPanel.css";

const ControlPanel = () => {
  const [flightName, setFlightName] = useState("");
  const { response, planeIds } = useSocket();
  const [isFlightRunning, setIsFlightRunning] = useState(false);
  const intervalRef = useRef(null);

  const handleInputChange = (e) => {
    setFlightName(e.target.value);
  };

  const startFlightUpdates = (flightName) => {
    handleStartFlight(flightName);
    setIsFlightRunning(true);
    intervalRef.current = setInterval(() => {
      console.log(`Updating flight position for ${flightName}`);
      // Update flight position logic here
      handleStartFlight(flightName);
    }, 2000);
  };

  const stopFlightUpdates = (flightName) => {
    handleStopFlight(flightName);
    setIsFlightRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      // Clear interval on component unmount
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

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
          onClick={() => startFlightUpdates(flightName)}
          className="start-button"
          disabled={isFlightRunning}
        >
          Start Flight
        </button>
        <button
          onClick={() => stopFlightUpdates(flightName)}
          className="stop-button"
          disabled={!isFlightRunning}
        >
          Stop Flight
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
