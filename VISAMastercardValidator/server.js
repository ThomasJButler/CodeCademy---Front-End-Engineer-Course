const express = require('express');
const path = require('path');
const { validateLuhn, getCardBrand } = require('./src/validator');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/validate', (req, res) => {
  const card = req.query.card;
  const brand = getCardBrand(card);
  const valid = validateLuhn(card);

  res.json({ brand, valid });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
