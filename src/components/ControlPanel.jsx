import { useState,useEffect } from "react";
import handleStartFlight from "../services/handleStartFlight";
import handleStopFlight from "../services/handleStopFlight";
import { fetchPlaneNames } from '../services/planeService'; // Assuming the service is in planeService.js


const ControlPanel = () => {
  const [flightName, setFlightName] = useState("");
  const [planes, setPlanes] = useState([]);

  const handleInputChange = (e) => {
    setFlightName(e.target.value);
  };

  useEffect(() => {
    const getPlanes = async () => {
      try {
        const planeNames = await fetchPlaneNames();
        const names = planeNames.map((plane) => plane?.airPlaneName);
        console.log(names,  ' - names ');
        setPlanes(names);
      } catch (error) {
        console.log(error.message);
      }
    };

    // getPlanes();
  }, []);

  return (
    <div className="control-panel">
      <h2>Control Panel</h2>
      <div className="input-group">
        <label className="input-label">Flight Name:</label>
        <input
          type="text"
          value={flightName}
          onChange={handleInputChange}
          className="input-field"
        />
      </div>
      <div>
        <button
          onClick={() => handleStartFlight(flightName)}
          className="start-button"
        >
          Start Flight
        </button>
        <button
          onClick={() => handleStopFlight(flightName)}
          className="stop-button"
        >
          Stop Flight
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;

// import { useState, useEffect } from "react";
// import handleStartFlight from "../services/handleStartFlight";
// import handleStopFlight from "../services/handleStopFlight";
// import { fetchPlaneNames } from "../services/planeService"; // Assuming the service is in planeService.js
// import "../assets/styles/ControlPanel.css";

// const ControlPanel = () => {
//   const [flightName, setFlightName] = useState("");
//   const [planes, setPlanes] = useState([]);
//   // const [planeId, setPlaneId] = useState("");

//   // const handleInputChange = (e) => {
//   //   setFlightName(e.target.value);
//   // };

//   useEffect(() => {
//     const getPlanes = async () => {
//       try {
//         const planeNames = await fetchPlaneNames();
//         const names = planeNames.map((plane) => plane?.airPlaneName);
//         console.log(names, " - names ");
//         setPlanes(names);
//       } catch (error) {
//         console.log(error.message);
//       }
//     };

//     getPlanes();
//   }, []);

//   return (
//     <div className="control-panel">
//       <h2>Search Flight</h2>
//       <div className="input-group">
//         <select
//           value={flightName}
//           onChange={(e) => setFlightName(e.target.value)}
//           required
//         >
//           <option value="">Select Plane</option>
//           {planes.map((plane) => (
//             <option key={plane} value={plane}>
//               {plane}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <button
//           onClick={() => handleStartFlight(flightName)}
//           className="start-button"
//         >
//           Start Flight
//         </button>
//         <button
//           onClick={() => handleStopFlight(flightName)}
//           className="stop-button"
//         >
//           Stop Flight
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ControlPanel;

