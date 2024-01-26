const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const { login, authenticateToken } = require('./userModule');
const { getRoom, postRoom, updateRoom, deleteRoom, getRoomByName, getFacesByRoomId, getCasesByFaceId } = require('./roomModule');
const { getPricing, updatePricing } = require('./pricingModule');
const db = require('./dbModule');
const crypto = require('crypto');
const stripe = require('stripe')('sk_test_51OQrfjDD807lZgcdzq2kDfjj01Xd4yxFUbnKdLt0Xk0Kn9cOKXdd00RbWinAV5PQ4QUJ3nmrfriPlCve76kuIWn700leK3ZpbI'); // Remplacez par votre clé secrète Stripe


const app = express();
const port = 3000;

app.use(session({
  secret: crypto.randomBytes(64).toString('hex'),
  resave: true,
  saveUninitialized: true
}));

app.use(cors());
app.use(bodyParser.json());

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
app.get('/api/pricing', getPricing);
app.put('/api/pricing/:id', updatePricing);

app.post('/api/create-payment-intent', authenticateToken, async (req, res) => {
  const { amount, currency } = req.body;

  try {
    // Créer le paiement avec Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création du paiement' });
  }
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
