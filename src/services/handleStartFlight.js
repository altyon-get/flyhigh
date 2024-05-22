import socket from "../services/socket";

const handleStartFlight = async (flightName) => {
    try {
        socket.emit('startFlight', flightName);
    } catch (error) {
        console.error("Error starting flight:", error);
        alert("Failed to start flight");
    }
};

// Listen for updates and messages
socket.on('message', (message) => {
    console.log(message);
    // alert(message); // Or display it in the UI
});

socket.on('weatherBad', (message) => {
    console.log(message);
    // alert(message); // Or display it in the UI
});

socket.on('flightUpdated', (flights) => {
    // Update the flights in your state/context
    // setFlights(flights);
    // console.log("Flights updated:", flights);
});

export default handleStartFlight;
