// server.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const { login, authenticateToken } = require('./userModule');
const { getRoom, postRoom, updateRoom, deleteRoom, getRoomByName, getFacesByRoomId, getCasesByFaceId } = require('./roomModule');
const db = require('./dbModule');
const crypto = require('crypto');


const app = express();
const port = 3000;

app.use(session({
  secret: crypto.randomBytes(64).toString('hex'),
  resave: true,
  saveUninitialized: true
}));

app.use(cors());
app.use(bodyParser.json());

// Routes
app.post('/login', login);
app.get('/api/private-route', authenticateToken, (req, res) => {
  res.json({ message: 'Bienvenue dans la zone privée !' });
});
app.get('/api/rooms', getRoom);
app.post('/api/rooms', postRoom);
app.put('/api/rooms/:id', updateRoom);
app.delete('/api/rooms/:id', deleteRoom);
app.get('/api/room/:id', getRoomByName);
app.get('/api/room/:id/faces', getFacesByRoomId)
app.get('/api/room/:roomId/:faceId/cases', getCasesByFaceId)

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
