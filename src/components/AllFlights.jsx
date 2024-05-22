// src/components/AllFlights.jsx
import React, { useEffect, useState } from "react";
// import { fetchPlanes } from "../services/FlightService";
import FlightDetails from "./FlightDetails";
import "../assets/styles/AllFlights.css";
import socket from "../services/socket";
const AllFlights = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("plane");
  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 10;

  useEffect(() => {
    socket.connect();
    const getFlights = async () => {
      console.log("Flight...........");
      try {
        console.log("Fetching flights...");
        await socket.on("getFlight", (data) => {
          console.log(data);
          setFlights(data);
          setFilteredFlights(data);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getFlights();
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    filterFlights(event.target.value);
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
    filterFlights(searchTerm);
  };

  const filterFlights = (term) => {
    if (!term) {
      setFilteredFlights(flights);
      return;
    }

    const filtered = flights.filter((flight) => {
      if (searchType === "plane") {
        return flight.airPlaneName.toLowerCase().includes(term.toLowerCase());
      } else if (searchType === "source") {
        return flight.departureAirport
          .toLowerCase()
          .includes(term.toLowerCase());
      } else if (searchType === "destination") {
        return flight.destinationAirport
          .toLowerCase()
          .includes(term.toLowerCase());
      }
      return false;
    });
    setFilteredFlights(filtered);
  };

  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = filteredFlights.slice(
    indexOfFirstFlight,
    indexOfLastFlight
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //   if (!flights.length) return <div>No Flight Found</div>;

  return (
    <div className="all-flights-container">
      <h1>All Flights</h1>
      <div className="search-bar">
        <select onChange={handleSearchTypeChange} value={searchType}>
          <option value="plane">Plane Name</option>
          <option value="source">Source</option>
          <option value="destination">Destination</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${searchType}`}
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="flight-list">
        {currentFlights.length > 0 ? (
          currentFlights.map((flight) => (
            <FlightDetails key={flight._id} flight={flight} />
          ))
        ) : (
          <p>No flights found</p>
        )}
      </div>

      <div className="pagination">
        {Array.from(
          { length: Math.ceil(filteredFlights.length / flightsPerPage) },
          (_, i) => (
            <button key={i} onClick={() => paginate(i + 1)}>
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default AllFlights;
