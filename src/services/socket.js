// socket.js

import io from 'socket.io-client';

// Establish socket connection
const socket = io('https://airbusaerothonbackend.onrender.com/');

export default socket;
