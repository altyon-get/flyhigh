// src/components/FlightDetails.jsx
// import React from "react";
import "../assets/styles/FlightDetails.css";
import PropTypes from "prop-types";

const FlightDetails = ({ flight }) => {
  return (
    <div className="flight-details">
      <h2>Flight {flight.airPlaneName}</h2>
      <p>
        <strong>Departure Airport:</strong> {flight.departureAirport}
      </p>
      <p>
        <strong>Destination Airport:</strong> {flight.destinationAirport}
      </p>
      <p>
        <strong>Departure Time:</strong>{" "}
        {new Date(flight.departureTime).toLocaleString()}
      </p>
      <p>
        <strong>Destination Time:</strong>{" "}
        {new Date(flight.destinationTime).toLocaleString()}
      </p>
      <p>
        <strong>Reserved Coordinates:</strong>
      </p>
      <ul>
        {flight.reserveCord.map((cord) => (
          <li key={cord._id}>{`x: ${cord.x}, y: ${cord.y}`}</li>
        ))}
      </ul>
    </div>
  );
};

PropTypes.FlightDetails = {
  flight: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    airPlaneName: PropTypes.string.isRequired,
    departureAirport: PropTypes.string.isRequired,
    destinationAirport: PropTypes.string.isRequired,
    departureTime: PropTypes.string.isRequired,
    destinationTime: PropTypes.string.isRequired,
    reserveCord: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default FlightDetails;
