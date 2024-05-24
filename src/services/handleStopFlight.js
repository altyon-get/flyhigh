import socket from "../services/socket";

const handleStopFlight = async (flightId) => {
    try {
        socket.emit('stopFlight', flightId);
        // console.log('flight stopped');
    } catch (error) {
        console.error("Error stopping flight:", error);
        alert("Failed to stop flight");
    }
};

export default handleStopFlight;
