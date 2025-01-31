const request = require('supertest');
const app = require('../server');

describe('Task Routes', () => {
  it('devrait permettre d\'ajouter une tâche avec un token', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Nouvelle tâche', description: 'Description test' })
      .set('Authorization', 'Bearer <ton_token_jwt>'); // Utiliser un token valide
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('title', 'Nouvelle tâche');
  });
});
