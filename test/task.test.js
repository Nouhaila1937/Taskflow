import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js'; // Adjust the path to your server.js file

const { expect } = chai;
chai.use(chaiHttp);

describe('Task API', () => {
  it('should return status 200 for GET /tasks', async () => {
    const res = await chai.request(server).get('/tasks');
    expect(res).to.have.status(200);
  });

  it('should create a new task', async () => {
    const task = { title: 'New Task', description: 'Description of the task', dueDate: '2025-01-01' };
    const res = await chai.request(server).post('/tasks').send(task);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('title').eql('New Task');
  });
});