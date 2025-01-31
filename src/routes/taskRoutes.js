const express = require('express');
const router = express.Router();

// Exemple de route pour obtenir une liste des tâches
router.get('/', (req, res) => {
  // Logique pour récupérer les tâches
  res.send('Liste des tâches');
});

// Exemple de route pour ajouter une tâche
router.post('/', (req, res) => {
  // Logique pour ajouter une tâche
  res.send('Tâche ajoutée');
});

// Exemple de route pour modifier une tâche
router.put('/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  // Logique pour modifier une tâche
  res.send(`Tâche ${taskId} modifiée`);
});

// Exemple de route pour supprimer une tâche
router.delete('/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  // Logique pour supprimer une tâche
  res.send(`Tâche ${taskId} supprimée`);
});

module.exports = router;
