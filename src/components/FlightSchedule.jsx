// src/components/FlightSchedule.jsx
import React, { useState } from 'react';
import '../assets/style/FlightSchedule.css';

const FlightSchedule = () => {
  const [planeId, setPlaneId] = useState('');
  const [startId, setStartId] = useState('');
  const [goalId, setGoalId] = useState('');
  const [depTime, setDepTime] = useState('');
  const [arrTime, setArrTime] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const flightData = {
      planeId,
      startId,
      goalId,
      depTime,
      arrTime,
    };

    try {
      const res = await fetch('http://localhost:3000/api/flight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flightData),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
      setResponse({ error: 'Failed to schedule flight' });
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
            <option value="664b31ea383b6633b2801751">Plane 1</option>
            <option value="2">Plane 2</option>
            <option value="3">Plane 3</option>
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
            <option value="664a58191fe2efa499c776c4">Source 1</option>
            <option value="664a58191fe2efa499c776c5">Source 2</option>
            <option value="664a58191fe2efa499c776c6">Source 3</option>
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
            <option value="664a58191fe2efa499c776cc">Destination 1</option>
            <option value="664a58191fe2efa499c776cd">Destination 2</option>
            <option value="664a58191fe2efa499c776ce">Destination 3</option>
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