const express = require('express');
const router = express.Router();

// Exemple de route pour l'inscription
router.post('/signup', (req, res) => {
  // Logique pour l'inscription
  res.send('Inscription réussie');
});

// Exemple de route pour la connexion
router.post('/login', (req, res) => {
  // Logique pour la connexion
  res.send('Connexion réussie');
});

module.exports = router;
