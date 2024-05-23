import React, { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import "../assets/styles/FlightSchedule.css";
import socket from "../services/socket"; // Adjust the path if necessary

const FlightSchedule = () => {
  const [planeId, setPlaneId] = useState("");
  const [startId, setStartId] = useState("");
  const [goalId, setGoalId] = useState("");
  const [depTime, setDepTime] = useState("");
  const [arrTime, setArrTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const {
    planes,
    airports,
    createFlight,
    setSelectedAirports,
    setScheduledFlights,
  } = useSocket();

  const handleSubmit = (e) => {
    console.log("Submitting flight schedule...");
    e.preventDefault();
    if (startId === goalId) {
      alert("Source and Destination cannot be the same.");
      return;
    }

    const flightData = {
      airPlaneName: planeId,
      departureAirport: startId,
      destinationAirport: goalId,
      departureTime: depTime,
      destinationTime: arrTime,
    };

    setLoading(true);
    createFlight(flightData);

    socket.on("flightCreated", (data) => {
      setScheduledFlights((prev) => [...prev, data.planeId]);
      setResponse(data);
      setLoading(false);

      // Calculate the expected arrival time
      const departureTime = new Date(depTime);
      const arrivalTime = new Date(
        departureTime.getTime() + data.reserveCord.length * 4000 // 4000ms = 4 seconds
      );
      setArrTime(arrivalTime.toISOString());
    });
  };

  const handleAirportChange = (e, type) => {
    const value = e.target.value;
    if (type === "start") {
      setStartId(value);
      setSelectedAirports((prev) => ({ ...prev, start: value }));
    } else if (type === "goal") {
      setGoalId(value);
      setSelectedAirports((prev) => ({ ...prev, goal: value }));
    }
  };

  return (
    <div className="flight-schedule">
      <h2>Schedule Flight</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Plane ID:</label>
          <select
            value={planeId}
            onChange={(e) => setPlaneId(e.target.value)}
            required
          >
            <option value="">Select Plane</option>
            {planes.map((plane) => (
              <option key={plane} value={plane}>
                {plane}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Source ID:</label>
          <select
            value={startId}
            onChange={(e) => handleAirportChange(e, 'start')}
            required
          >
            <option value="">Select Source</option>
            {airports.map(({ airPortName }) => (
              <option key={airPortName} value={airPortName}>
                {airPortName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Destination ID:</label>
          <select
            value={goalId}
            onChange={(e) => handleAirportChange(e, 'goal')}
            required
          >
            <option value="">Select Destination</option>
            {airports.map(({ airPortName }) => (
              <option key={airPortName} value={airPortName}>
                {airPortName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Departure Time:</label>
          <input
            type="datetime-local"
            value={depTime}
            onChange={(e) => setDepTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Expected arrival time:</label>
          <input
            type="datetime-local"
            value={arrTime}
            onChange={(e) => setArrTime(e.target.value)}
            required
            readOnly
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Scheduling..." : "Schedule Flight"}
        </button>
      </form>
      {response && (
        <div className="response">
          <h3>Flight Scheduled Successfully</h3>
          <p>Flight Name: {response.airPlaneName}</p>
          <p>Expected Arrival Time: {new Date(arrTime).toLocaleString()}</p>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FlightSchedule;
