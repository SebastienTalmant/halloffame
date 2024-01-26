const db = require('./dbModule');


// récupération données table pricing
const getPricing = (req, res) => {
    const query = 'SELECT * FROM pricing';
    db.query(query, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Une erreur est survenue lors de la récupération des prix depuis la base de données');
      }
  
      res.json(result);
    });
};


// mise à jour données table pricing
const updatePricing = (req, res) => {
    const pricingId = req.params.id;
    const { price, caracteres } = req.body;
    const query = 'UPDATE pricing SET price = ?, caracteres = ? WHERE id = ?';
    db.query(query, [price, caracteres, pricingId], (err) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Une erreur est survenue lors de la mise à jour des prix dans la base de données');
      }
  
      res.json({ message: 'Prix mise à jour avec succès' });
    });
};


module.exports = {
  getPricing,
  updatePricing,
};
