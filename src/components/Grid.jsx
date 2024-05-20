// src/components/Grid.jsx
import React, { useEffect, useState } from 'react';
import { fetchCords } from '../services/cordService';
// import './Grid.css';

const Grid = () => {
  const [cords, setCords] = useState([]);
  const [planePosition, setPlanePosition] = useState(0); // Track the current position of the plane
  const [reserveCord, setReserveCord] = useState([
    {
      "_id": "664a58191fe2efa499c776c4",
      "x": 8,
      "y": 0,
      "weather": "good",
      "reserve": false,
      "createdAt": "2024-05-19T19:50:49.816Z",
      "updatedAt": "2024-05-19T19:50:49.816Z",
      "__v": 0
    },
    {
      "_id": "664a58191fe2efa499c776c6",
      "x": 8,
      "y": 1,
      "weather": "good",
      "reserve": false,
      "createdAt": "2024-05-19T19:50:49.859Z",
      "updatedAt": "2024-05-20T13:14:18.013Z",
      "__v": 0
    },
    {
      "_id": "664a58191fe2efa499c776c8",
      "x": 8,
      "y": 2,
      "weather": "good",
      "reserve": false,
      "createdAt": "2024-05-19T19:50:49.902Z",
      "updatedAt": "2024-05-20T13:14:20.021Z",
      "__v": 0
    },
    {
      "_id": "664a58191fe2efa499c776ca",
      "x": 8,
      "y": 3,
      "weather": "good",
      "reserve": false,
      "createdAt": "2024-05-19T19:50:49.945Z",
      "updatedAt": "2024-05-20T13:14:22.045Z",
      "__v": 0
    },
    {
      "_id": "664a58191fe2efa499c776cc",
      "x": 8,
      "y": 4,
      "weather": "good",
      "reserve": false,
      "createdAt": "2024-05-19T19:50:49.986Z",
      "updatedAt": "2024-05-19T19:50:49.986Z",
      "__v": 0
    }
  ]); // Example reserveCord data

  useEffect(() => {
    const getCords = async () => {
      try {
        const data = await fetchCords();
        setCords(data);
      } catch (error) {
        console.error('Error fetching cords:', error);
      }
    };
    getCords();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlanePosition((prevPosition) => (prevPosition + 1) % reserveCord.length);
    }, 2000); // Move the plane every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [reserveCord.length]);

  const getColor = (cord) => {
    if (cord.reserve) return 'gray';
    switch (cord.weather) {
      case 'good': return 'green';
      case 'rainy': return 'blue';
      case 'stormy': return 'red';
      default: return 'white';
    }
  };

  const renderGrid = () => {
    const gridSize = 10;
    const svgSize = 500; // Adjusted SVG size to include padding
    const spacing = (svgSize - 0) / gridSize; // Adjusted spacing to include padding

    return (
      <svg width={svgSize} height={svgSize} className="grid-svg">
        {Array.from({ length: gridSize }).map((_, y) =>
          Array.from({ length: gridSize }).map((_, x) => {
            const cord = cords.find(c => c.x === x && c.y === y) || {};
            const fillColor = getColor(cord);
            return (
              <g key={`${x}-${y}`}>
                {/* Draw horizontal lines */}
                {x < gridSize - 1 && (
                  <line
                    x1={x * spacing + 10}
                    y1={y * spacing + 10}
                    x2={(x + 1) * spacing + 10}
                    y2={y * spacing + 10}
                    stroke="black"
                  />
                )}
                {/* Draw vertical lines */}
                {y < gridSize - 1 && (
                  <line
                    x1={x * spacing + 10}
                    y1={y * spacing + 10}
                    x2={x * spacing + 10}
                    y2={(y + 1) * spacing + 10}
                    stroke="black"
                  />
                )}
                {/* Draw circles */}
                <circle
                  cx={x * spacing + 10}
                  cy={y * spacing + 10}
                  r={5}
                  fill={fillColor}
                />
                {/* Draw text */}
                <text
                  x={x * spacing + 18}
                  y={y * spacing + 30}
                  fontSize="10"
                  fill="black"
                >
                  {`(${x},${y})`}
                </text>
              </g>
            );
          })
        )}
        {/* Render the plane */}
        {reserveCord.length > 0 && (
          <text
            x={reserveCord[planePosition].x * spacing + 10}
            y={reserveCord[planePosition].y * spacing + 10}
            fontSize="20"
            fill="blue"
          >
            ✈️
          </text>
        )}
      </svg>
    );
  };

  return (
    <div className="grid-container">
      {renderGrid()}
    </div>
  );
};

export default Grid;