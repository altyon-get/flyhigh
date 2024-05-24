import React, { useState, useEffect, useRef } from "react";
import { useSocket } from "../context/SocketContext";
import handleStartFlight from "../services/handleStartFlight";
import handleStopFlight from "../services/handleStopFlight";
import "../assets/styles/ControlPanel.css";

const ControlPanel = () => {
  const { response, planeIds, flights, flightLogs, setSelectedFlight, selectedFlight,setFlightLogs } = useSocket();
  const [flightName, setFlightName] = useState("");
  const [isFlightRunning, setIsFlightRunning] = useState(false);
  const logsEndRef = useRef(null);
  const intervalRef = useRef(null);

  const handleInputChange = (e) => {
    const flightId = Number(e.target.value);
    setFlightName(flightId);
    const flight = flights.find((flight) => flight.flightId === flightId);
    setSelectedFlight(flight);
  };

  const startFlightUpdates = (flightName) => {
    handleStartFlight(flightName);
    setIsFlightRunning(true);
    const status =`Flight${flightName} taking off!`;
    setFlightLogs((prevLogs) => [...prevLogs, status]);
    intervalRef.current = setInterval(() => {
      handleStartFlight(flightName);
    }, 2000);
  };

  const stopFlightUpdates = (flightName) => {
    handleStopFlight(flightName);
    setIsFlightRunning(false);
    const status =`Flight${flightName} stopping...!`
    setFlightLogs((prevLogs) => [...prevLogs, status]);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [flightLogs]);

  useEffect(() => {
    setFlightLogs([]);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="control-panel-container">
      <div className="control-panel">
        <h2>Search Flight</h2>
        <div className="input-group">
          <select
            value={flightName}
            onChange={handleInputChange}
            className="select-plane"
            required
          >
            <option value="">Select Plane</option>
            {planeIds &&
              planeIds.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="details-and-actions">
        <div className="flight-details">
          <h2>Flight Details</h2>
          {selectedFlight ? (
            <>
              <div>
                <p>
                  <strong>Flight Name:</strong> {selectedFlight.airPlaneName}
                </p>
                <p>
                  <strong>Departure Airport:</strong> {selectedFlight.departureAirport}
                </p>
                <p>
                  <strong>Destination Airport:</strong> {selectedFlight.destinationAirport}
                </p>
                <p>
                  <strong>Departure Time:</strong> {new Date(selectedFlight.departureTime).toLocaleString()}
                </p>
                <p>
                  <strong>Destination Time:</strong> {new Date(selectedFlight.destinationTime).toLocaleString()}
                </p>
              </div>
              <div className="button-group">
                <button
                  onClick={() => startFlightUpdates(flightName)}
                  className="start-button"
                  disabled={isFlightRunning || !flightName}
                >
                  {isFlightRunning ? "Running" : "Run"}
                </button>
                {isFlightRunning && (
                  <button
                    onClick={() => stopFlightUpdates(flightName)}
                    className="stop-button"
                  >
                    Stop
                  </button>
                )}
              </div>
            </>
          ) : (
            <p>No flight selected</p>
          )}
        </div>

        <div className="flight-logs">
          <h2>Flight Logs</h2>
          <ul>
            {flightLogs && flightLogs.map((log, index) => (
              <li key={index} className="log-item">
                {log}
              </li>
            ))}
            <div ref={logsEndRef} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
