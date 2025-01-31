import { expect } from 'chai';
import supertest from 'supertest';
import app from '../server';  // Le chemin vers ton fichier server.js

const request = supertest(app);

describe('Task API', () => {
  
  // Test de la route GET /tasks
  it('should return status 200 for GET /tasks', async () => {
    const res = await request.get('/tasks');
    expect(res.status).to.equal(200);  // Vérifie que la réponse est un statut 200
  });

  // Test de la route POST /tasks (si tu as une route pour ajouter une tâche)
  it('should create a new task', async () => {
    const task = { title: 'New Task', description: 'Description of the task', dueDate: '2025-01-01' };
    const res = await request.post('/tasks').send(task);
    expect(res.status).to.equal(201);  // Vérifie que la réponse est un statut 201
    expect(res.body).to.have.property('title').eql('New Task');  // Vérifie que la tâche a bien été créée
  });

});
