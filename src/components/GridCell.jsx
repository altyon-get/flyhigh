// src/components/GridCell.jsx
import PropTypes from "prop-types";

const GridCell = ({ x, y, fillColor, isAirport }) => {
  const spacing = 40; // Adjust as needed for spacing

  return (
    <g key={`${x}-${y}`}>
      {x < 19 && (
        <line
          x1={x * spacing + 10}
          y1={y * spacing + 10}
          x2={(x + 1) * spacing + 10}
          y2={y * spacing + 10}
          stroke="grey"
        />
      )}
      {y < 19 && (
        <line
          x1={x * spacing + 10}
          y1={y * spacing + 10}
          x2={x * spacing + 10}
          y2={(y + 1) * spacing + 10}
          stroke="grey"
        />
      )}
      {isAirport && (
        <rect
          x={x * spacing + 5}
          y={y * spacing +5}
          width={10} // Adjust the width as needed
          height={10} // Adjust the height as needed
          fill={'skyblue'}
        />
      )}
      {!isAirport && (
        <circle
          cx={x * spacing + 10}
          cy={y * spacing + 10}
          r={4}
          fill={'green'}
        />
      )}

      <text x={x * spacing + 18} y={y * spacing + 30} fontSize="10" fill="black">
        {`(${x},${y})`}
      </text>
      {fillColor === "blue" && (
        <svg
          x={x * spacing + 10}
          y={y * spacing - 10}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 18H6C4.34315 18 3 16.6569 3 15C3 13.3431 4.34315 12 6 12H7C7.55228 12 8 11.5523 8 11C8 9.34315 9.34315 8 11 8C12.6569 8 14 9.34315 14 11C14 11.5523 14.4477 12 15 12H16C17.6569 12 19 13.3431 19 15C19 16.6569 17.6569 18 16 18H19Z"
            fill="grey"
          />
        </svg>
      )}
      {fillColor === "red" && (
        <svg
          x={x * spacing + 10}
          y={y * spacing - 10}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 18H6C4.34315 18 3 16.6569 3 15C3 13.3431 4.34315 12 6 12H7C7.55228 12 8 11.5523 8 11C8 9.34315 9.34315 8 11 8C12.6569 8 14 9.34315 14 11C14 11.5523 14.4477 12 15 12H16C17.6569 12 19 13.3431 19 15C19 16.6569 17.6569 18 16 18H19Z"
            fill="black"
          />
        </svg>
      )}
    </g>
  );
};

GridCell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  fillColor: PropTypes.string.isRequired,
};

export default GridCell;
