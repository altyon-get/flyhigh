import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import '../assets/styles/weatherForm.css';
// import socket from "../services/socket"; // Adjust the path if necessary

const WeatherForm = () => {
  const {changeWeather} = useSocket();

  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [weather, setWeather] = useState('normal');

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(event, event');
    // socket.emit('changeWeather', { x: parseInt(x), y: parseInt(y), weather });
    changeWeather({ x: parseInt(x), y: parseInt(y), weather });
  };

  return (
    <form className="weather-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="x-coordinate">X Coordinate:</label>
        <input
          id="x-coordinate"
          type="number"
          value={x}
          onChange={(e) => setX(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="y-coordinate">Y Coordinate:</label>
        <input
          id="y-coordinate"
          type="number"
          value={y}
          onChange={(e) => setY(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="weather">Weather:</label>
        <select
          id="weather"
          value={weather}
          onChange={(e) => setWeather(e.target.value)}
          required
        >
          <option value="normal">Normal</option>
          <option value="rainy">Rainy</option>
          <option value="stormy">Stormy</option>
        </select>
      </div>
      <button type="submit">Set Weather</button>
    </form>
  );
};

export default WeatherForm;
