// src/components/FlightSchedule.jsx
import { useEffect, useState } from "react";
import { fetchPlaneNames } from '../services/planeService'; // Assuming the service is in planeService.js
import { fetchAirportNames } from '../services/airportService'; // Assuming the service is in planeService.js
import "../assets/styles/FlightSchedule.css";


const FlightSchedule = () => {
  const [planeId, setPlaneId] = useState("");
  const [startId, setStartId] = useState("");
  const [goalId, setGoalId] = useState("");
  const [depTime, setDepTime] = useState("");
  const [arrTime, setArrTime] = useState("");
  const [response, setResponse] = useState(null);
  // const [cords, setCords] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    const getPlanes = async () => {
      try {
        const planeNames = await fetchPlaneNames();
        const names = planeNames.map((plane) => plane?.airPlaneName);
        // console.log(names,  ' - names ');
        setPlanes(names);
      } catch (error) {
        console.log(error.message);
      }
    };

    const getAirports = async () => {
      try{
        const airportNames = await fetchAirportNames();
        const names = airportNames.map((airport) => airport?.airPortName);
        // console.log(airportNames);
        setAirports(names);
      } catch (error) {
        console.log(error.message);
      }
    }

    getPlanes();
    getAirports();
  }, []);

  const handleSubmit = async (e) => {
    if (startId === goalId) {
      alert("Source and Destination cannot be the same.");
      return;
    }

    e.preventDefault();

    const flightData = {
      airPlaneName: planeId,
      departureAirport: startId,
      destinationAirport: goalId,
      departureTime: depTime,
      destinationTime: arrTime,
    };

    try {
      const res = await fetch("http://localhost:3000/api/flight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(flightData),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
      setResponse({ error: "Failed to schedule flight" });
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
            onChange={(e) => setStartId(e.target.value)}
            required
          >
            <option value="">Select Source</option>
            {airports.map((airport) => (
              <option key={airport} value={airport}>
                {airport}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Destination ID:</label>
          <select
            value={goalId}
            onChange={(e) => setGoalId(e.target.value)}
            required
          >
            <option value="">Select Destination</option>
            {airports.map((airport) => (
              <option key={airport} value={airport}>
                {airport}
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
          <label>Arrival Time:</label>
          <input
            type="datetime-local"
            value={arrTime}
            onChange={(e) => setArrTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Schedule Flight</button>
      </form>
      {response && (
        <div className="response">
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FlightSchedule;
