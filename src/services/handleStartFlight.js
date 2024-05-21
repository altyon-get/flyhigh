import axios from 'axios';

const handleStartFlight = async (flightName) => {
    try {
        const response = await axios.post('http://localhost:3000/api/startFlight', { "flightId": flightName });
        console.log(response);
    } catch (error) {
        console.error("Error starting flight:", error);
        alert("Failed to start flight");
    }
};

export default handleStartFlight;