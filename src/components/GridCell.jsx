// src/components/GridCell.jsx
import PropTypes from "prop-types";

const GridCell = ({
  x,
  y,
  fillColor,
  isAirport,
  isHighlighted,
  airportName,
}) => {
  const spacing = 40;
  const iconSize = 25;
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
        <svg
          x={x * spacing - 3}
          y={y * spacing - 5}
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          className={isHighlighted ? "blinking" : ""}
        >
          <path
            d="M12 2C8.1 2 5 5.1 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.1 15.9 2 12 2ZM12 11.5C10.6 11.5 9.5 10.4 9.5 9C9.5 7.6 10.6 6.5 12 6.5C13.4 6.5 14.5 7.6 14.5 9C14.5 10.4 13.4 11.5 12 11.5Z"
            fill={isHighlighted ? "green" : "skyblue"}
          />
        </svg>
      )}
      {!isAirport && (
        <circle
          cx={x * spacing + 10}
          cy={y * spacing + 10}
          r={2}
          fill={"lightgrey"}
        />
      )}
      {/* <text x={x * spacing + 18} y={y * spacing + 30} fontSize="10" fill="black">
        {`(${x},${y})`}
      </text> */}
      {isAirport && (
        <text x={x * spacing} y={y * spacing + 30} fontSize="10" fill="black">
          {/* {`(${x},${y})`} */}
          {airportName}
        </text>
      )}
      {isAirport && (
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {airportName}
        </span>
      )}
      {fillColor === "blue" && (
        <svg
          x={x * spacing + 10}
          y={y * spacing - 10}
          width="20"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 2L3 14H11L7 22L17 10H9L13 2Z"
            fill="yellow"
            stroke="black"
            strokeWidth="1"
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
            fill="grey"
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
  isHighlighted: PropTypes.bool.isRequired,
  isAirport: PropTypes.bool.isRequired,
};

export default GridCell;
