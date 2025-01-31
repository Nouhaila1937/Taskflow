const request = require('supertest');
const app = require('../server'); // Assure-toi que ton serveur est exporté dans server.js
const mongoose = require('mongoose');

afterAll(async () => {
  await mongoose.connection.close(); // Fermer la connexion MongoDB après les tests
});

describe('Tests sur les routes Auth', () => {
  it('Devrait renvoyer une erreur si les identifiants sont incorrects', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'invalide@email.com', password: 'incorrect' });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message', 'Identifiants invalides');
  });
});
