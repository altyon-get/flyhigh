// src/components/Grid.jsx
import React, { useEffect, useState } from "react";
import { fetchCords } from "../services/cordService";
import { fetchPlanes } from "../services/FlightService";
import GridCell from "./GridCell";
import Plane from "./Plane";
import ControlPanel from "./ControlPanel";
import "../assets/style/Grid.css";


const Grid = () => {
  const [cords, setCords] = useState([]);
  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    const getCords = async () => {
      try {
        const data = await fetchCords();
        setCords(data);
      } catch (error) {
        console.error("Error fetching cords:", error);
      }
    };
    getCords();
  }, []);

  useEffect(() => {
    const getPlanes = async () => {
      try {
        const data = await fetchPlanes();
        setPlanes(data);
        console.log(data[0]?.reserveCord?.length, " -data");
      } catch (error) {
        console.error("Error fetching planes:", error);
      }
    };

    getPlanes(); // Initial fetch
    const interval = setInterval(getPlanes, 2000); // Fetch every 2000 ms

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

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

  const renderGrid = () => {
    const gridSize = 20;
    const svgSize = 840;
    const spacing = svgSize / gridSize;

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
                  />
                );
              })
            )}
            {planes &&
              planes.map((plane) => <Plane key={plane._id} plane={plane} />)}
          </svg>
          <ControlPanel />
        </div>
      </>
    );
  };

  return <div className="grid-container">{renderGrid()}</div>;
};

export default Grid;
