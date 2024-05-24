import { useEffect } from "react";
import { fetchPlanes } from "../services/FlightService";
import GridCell from "./GridCell";
import Plane from "./Plane";
import socket from "../services/socket";
import "../assets/styles/Grid.css";
import { useSocket } from "../context/SocketContext";

const Grid = () => {
  const { cords, flights, airports, selectedAirports, selectedFlight } =
    useSocket();
  const totalPlanes = 10;
  const remainingPlanes = totalPlanes - flights.length;

  const getColor = (cord) => {
    // if (cord.reserve) return "gray";
    switch (cord.weather) {
      case "good":
        return "green";
      case "rainy":
        return "blue";
      case "stormy":
        return "red";
      default:
        return "gray";
    }
  };

  const planeColors = ["red", "blue", "green", "orange", "purple"];

  console.log(selectedFlight, "selectedFlight");

  const renderGrid = () => {
    const gridSize = 20;
    const svgSize = 800;

    return (
      <>
        <div className="grid">
          <svg width={svgSize} height={svgSize} className="grid-svg">
            {Array.from({ length: gridSize }).map((_, y) =>
              Array.from({ length: gridSize }).map((_, x) => {
                const cord = cords.find((c) => c.x === x && c.y === y) || {};
                const fillColor = getColor(cord);
                const airport = airports.find((o) => o.x === x && o.y === y);

                const isHighlighted = airports.some(
                  (airport) =>
                    (airport.airPortName === selectedAirports.start ||
                      airport.airPortName === selectedAirports.goal) &&
                    airport.x === x &&
                    airport.y === y
                );

                const isAirport = airports.some((o) => o.x === x && o.y === y);
                return (
                  <GridCell
                    key={`${x}-${y}`}
                    x={x}
                    y={y}
                    fillColor={fillColor}
                    isAirport={isAirport}
                    isHighlighted={isHighlighted}
                    airportName={airport ? airport.airPortName : null}
                  />
                );
              })
            )}
            {flights &&
              flights.map((plane, index) => {
                console.log(plane, selectedFlight, "planeXX")
                const isSelected = plane._id === selectedFlight?._id;
                return (
                  <Plane
                    key={plane._id}
                    plane={plane}
                    index={index}
                    isSelected={isSelected}
                  />
                );
              })}
          </svg>
        </div>
      </>
    );
  };

  return (
    <div className="grid-container">
      <div className="tracker">Tracker</div>
      {renderGrid()}
      <div className="remaining-planes">
        {Array.from({ length: remainingPlanes }).map((_, index) => (
          <>
            <p className="plane-index">{index + 1}</p>
            <span key={index} className={`plane-icon plane-color-${index % 5}`}>
              ✈️
            </span>
          </>
        ))}
      </div>
    </div>
  );
};

export default Grid;
