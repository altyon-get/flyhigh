import socket from "../services/socket";

const handleStartFlight = async (flightName) => {
    try {
        socket.emit('startFlight', flightName);
    } catch (error) {
        console.error("Error starting flight:", error);
        alert("Failed to start flight");
    }
};

export default handleStartFlight;
