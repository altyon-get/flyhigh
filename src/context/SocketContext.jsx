import React, { createContext, useContext, useState, useEffect } from "react";
import socket from "../services/socket"; // Adjust the path if necessary

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [cords, setCords] = useState([]);
  const [flights, setFlights] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [airports, setAirports] = useState([]);
  const [scheduledFlights, setScheduledFlights] = useState([]);
  const [planeIds, setPlaneIds] = useState([]);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    socket.connect();

    socket.on("initData", ({ cords, flights }) => {
      setCords(cords);
      setFlights(flights);
      console.log(cords, flights, " first socket");
    });

    socket.on("weatherUpdate", (updatedCords) => {
      setCords((prevCords) => {
        const cordsMap = new Map(prevCords.map((c) => [`${c.x},${c.y}`, c]));
        updatedCords.forEach((c) => cordsMap.set(`${c.x},${c.y}`, c));
        return Array.from(cordsMap.values());
      });
      console.log("second socket data");
    });

    socket.on("getFlight", (data) => {
      setFlights(data);
      const planeIdsArray = data.map((flight) => flight?.flightId);
      // console.log(planeIdsArray, '-XXX');
      setPlaneIds(planeIdsArray);
      console.log(data, " third socket data");
    });

    socket.on("getAirPlane", (planeNames) => {
      const names = planeNames.map((plane) => plane?.airPlaneName);
      setPlanes(names);
      console.log(" fourth socket data");
    });

    socket.on("getAirports", (airportNames) => {
      // console.log(airportNames, " airport names");
      const names = airportNames.map((airport) => airport?.airPortName);
      setAirports(airportNames);
    });

    socket.on("flightCreated", (data) => {
      setScheduledFlights((prev) => [...prev, data.planeId]);
      setResponse(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const createFlight = (flightData) => {
    socket.emit("createFlight", flightData);
  };

  return (
    <SocketContext.Provider
      value={{
        cords,
        flights,
        planes,
        airports,
        scheduledFlights,
        response,
        createFlight,
        planeIds,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
