const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes'); // Assurez-vous que le chemin est correct
const bodyParser = require('body-parser');
dotenv.config();  // Charge le fichier .env

const app = express();
// Middleware pour analyser le JSON
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;  // Utilise le port si défini dans le .env, sinon 5000
const MONGO_URI = process.env.MONGO_URI;  // Utilise la variable d'environnement MONGO_URI


// Utiliser les routes pour les tâches
app.use('/tasks', taskRoutes); // Cela va lier /tasks à toutes les routes définies dans taskRoutes

// Vérifie si MONGO_URI est défini avant d'essayer de connecter
if (!MONGO_URI) {
  console.error('MONGO_URI non défini dans le fichier .env');
  process.exit(1);  // Arrête l'application si l'URL de MongoDB est manquante
}

// Connexion à MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connecté');
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erreur de connexion MongoDB:', err);
    process.exit(1);  // Arrête l'application si la connexion échoue
  });
