// src/components/Grid.jsx
import { useEffect, useState } from "react";
import { fetchPlanes } from "../services/FlightService";
import GridCell from "./GridCell";
import Plane from "./Plane";
import socket from "../services/socket";
import "../assets/styles/Grid.css";
import { useSocket } from "../context/SocketContext";

const Grid = () => {
  // const [cords, setCords] = useState([]);
  // const [planes, setPlanes] = useState([]);

  const { cords, flights, airports } = useSocket();

  // const obj = [];
  // airports.map((airport) => {
  //   obj.push({ x: airport.x, y: airport.y, airport: airport.airPortName });
  // } )

  // console.log(obj);
  const totalPlanes = 10; // Total number of planes to be displayed
  // Calculate remaining planes
  const remainingPlanes = totalPlanes - flights.length ;

  // useEffect(() => {
  //   socket.connect();
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // useEffect(() => {
  //   socket.on("initData", ({ cords, flights }) => {
  //     // console.log(cords, flights, " -data");
  //     setCords(cords);
  //   });

  //   socket.on("weatherUpdate", (updatedCords) => {
  //     setCords((prevCords) => {
  //       const cordsMap = new Map(prevCords.map((c) => [`${c.x},${c.y}`, c]));
  //       updatedCords.forEach((c) => cordsMap.set(`${c.x},${c.y}`, c));
  //       const newCords = Array.from(cordsMap.values());
  //       // console.log("Data updated:", newCords);
  //       return newCords;
  //     });
  //   });

  //   // return () => {
  //   //   socket.disconnect();
  //   // };
  // }, []);

  // useEffect(() => {
  //   const getPlanes = async () => {
  //     try {
  //       console.log("Fetching flights...");
  //       await socket.on("getFlight", (data) => {
  //         console.log(data);
  //         setPlanes(data);
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getPlanes(); // Initial fetch
  //   // const interval = setInterval(getPlanes, 2000); // Fetch every 2000 ms

  //   // return () => clearInterval(interval); // Cleanup interval on component unmount
  // }, []);

  const getColor = (cord) => {
    if (cord.reserve) return "gray";
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

  const renderGrid = () => {
    const gridSize = 20;
    const svgSize = 840;
    // const spacing = svgSize / gridSize;

    return (
      <>
        <div className="grid">
          <svg width={svgSize} height={svgSize} className="grid-svg">
            {Array.from({ length: gridSize }).map((_, y) =>
              Array.from({ length: gridSize }).map((_, x) => {
                const cord = cords.find((c) => c.x === x && c.y === y) || {};
                const fillColor = getColor(cord);
                return (
                  <GridCell
                    key={`${x}-${y}`}
                    x={x}
                    y={y}
                    fillColor={fillColor}
                    isAirport={airports.some((o) => o.x === x && o.y === y)}
                  />
                );
              })
            )}
            {flights &&
              flights.map((plane) => <Plane key={plane._id} plane={plane} />)}
          </svg>
        </div>
      </>
    );
  };

  return (
    <div className="grid-container">
      <div className="remaining-planes">
        {Array.from({ length: remainingPlanes }).map((_, index) => (
          <span key={index} className={`plane-icon plane-color-${index % 5}`}>
            ✈️
          </span>
          // <PlaneIcon key={index} color={planeColors[index % planeColors.length]} />
        ))}
      </div>
      {renderGrid()}
    </div>
  );
};

export default Grid;
