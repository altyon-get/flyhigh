// socket.js

import io from 'socket.io-client';

// Establish socket connection
const socket = io('http://localhost:3000');

export default socket;
