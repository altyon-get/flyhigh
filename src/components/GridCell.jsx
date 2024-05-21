// src/components/GridCell.jsx
import React from "react";

const GridCell = ({ x, y, fillColor }) => {
  const spacing = 40; // Adjust as needed for spacing

  return (
    <g key={`${x}-${y}`}>
      {x < 19 && (
        <line
          x1={x * spacing + 10}
          y1={y * spacing + 10}
          x2={(x + 1) * spacing + 10}
          y2={y * spacing + 10}
          stroke="black"
        />
      )}
      {y < 19 && (
        <line
          x1={x * spacing + 10}
          y1={y * spacing + 10}
          x2={x * spacing + 10}
          y2={(y + 1) * spacing + 10}
          stroke="black"
        />
      )}
      <circle
        cx={x * spacing + 10}
        cy={y * spacing + 10}
        r={4}
        fill={fillColor}
      />
      <text x={x * spacing + 18} y={y * spacing + 30} fontSize="10" fill="black">
        {`(${x},${y})`}
      </text>
    </g>
  );
};

export default GridCell;
