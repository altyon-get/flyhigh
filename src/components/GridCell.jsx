import PropTypes from "prop-types";

const GridCell = ({
  x,
  y,
  fillColor,
  isAirport,
  isHighlighted,
  airportName,
  showCoordinates,
  spacing,
}) => {
  const iconSize = 25;

  return (
    <g key={`${x}-${y}`}>
      {x < 19 && (
        <line
          x1={x * spacing + 10}
          y1={y * spacing + 10}
          x2={(x + 1) * spacing + 10}
          y2={y * spacing + 10}
          stroke="#ccc"
        />
      )}
      {y < 19 && (
        <line
          x1={x * spacing + 10}
          y1={y * spacing + 10}
          x2={x * spacing + 10}
          y2={(y + 1) * spacing + 10}
          stroke="#ccc"
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
      <text x={x * spacing} y={y * spacing + 30} fontSize="8" fill="black">
        {showCoordinates ? `(${x},${y})` : airportName}
      </text>
    </g>
  );
};

GridCell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  fillColor: PropTypes.string.isRequired,
  isHighlighted: PropTypes.bool.isRequired,
  isAirport: PropTypes.bool.isRequired,
  airportName: PropTypes.string,
  showCoordinates: PropTypes.bool.isRequired,
  spacing: PropTypes.number.isRequired,
};

export default GridCell;
