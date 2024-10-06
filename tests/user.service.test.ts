import request from 'supertest';
import app from "../src/app"
import exp from 'constants';

describe('POST /api/v1/register', () => {
  it('should return 400 for invalid credentials', async () => {
    const response = await request(app)
      .post('/api/v1/register')
      .send({ name: "joe",
              email: "userexample.com",
              charge: "employe",
              password: "string" });

    expect(response.status).toBe(400);
    //expect(response.body.message).toBe('Login successful');
  });

  it('should return 200 for valid credentials', async () => {
    const response = await request(app)
      .post('/api/v1/register')
      .send({ name: "joe",
              email: "user@example.com",
              charge: "employe",
              password: "string" });

    expect(response.status).toBe(200);
    //expect(response.body.message).toBe('Login successful');
  });
});

describe('POST /api/v1/login', () => {
  it('Should return 404 for user doesn\'t exists ', async () =>{
    const response = await request(app)
    .post('/api/v1/login')
    .send({email: 'Edwards@gmail.com', password : "abc-123"})

    expect(response.status).toBe(401)
  })
});

afterEach(() => {
  jest.clearAllTimers(); // Nettoyez les timers après chaque test
});

