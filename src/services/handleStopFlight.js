import axios from 'axios';


const handleStopFlight = async (flightName) => {
    try {
        const response = await axios.post('http://localhost:3000/api/stopFlight', { "flightId": flightName });
        console.log(response);
    } catch (error) {
        console.error("Error stopping flight:", error);
        alert("Failed to stop flight");
    }
};

export default handleStopFlight;