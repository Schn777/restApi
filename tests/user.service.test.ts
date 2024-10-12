import request from 'supertest';
import app from "../src/app"


var token : string;
var adminToken : string;

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
  
  it('should return 200 for valid credentials', async () => {
    const response = await request(app)
      .post('/api/v1/register')
      .send({ name: "joe",
              email: "admin@example.com",
              charge: "gestionnaire",
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
  });

  it('Should return 200 for user exists ', async () =>{
    const response = await request(app)
    .post('/api/v1/login')
    .send({email: 'user@example.com', password : "string"})
    token = await response.body.jwt;
    expect(response.status).toBe(200);
  })

  it('Should return 200 for user exists ', async () =>{
    const response = await request(app)
    .post('/api/v1/login')
    .send({email: 'admin@example.com', password : "string"})
    adminToken = await response.body.jwt;
    expect(response.status).toBe(200);
  })
});

describe('GET /api/v1/products', () => {
  it('Should return  403 for no token provided ', async () =>{
    const response = await request(app)
    .get('/api/v1/products')
    expect(response.status).toBe(401)
  });

  it('Should return 200 for any user\'s role with token ', async () =>{
    const response = await request(app)
    .get('/api/v1/products')
    .set('Authorization', `${token}`);

    expect(response.status).toBe(200)
  })
});

describe('GET /api/v1/admin/products', () => {
  it('Should return  403 for no token provided ', async () =>{
    const response = await request(app)
    .post('/api/v1/admin/products')
    expect(response.status).toBe(401)
  });

  it('Should return 200 for any user\'s role with token ', async () =>{
    const response = await request(app)
    .get('/api/v1/products')
    .set('Authorization', `${token}`);

    expect(response.status).toBe(200)
  })
});

describe('Post /api/v1/admin/create-products', () => {
  it('Should return  400 due the invalid field ', async () =>{
    const response = await request(app)
    .post('/api/v1/admin/create-products')
    .send(
      {
        name: "rocket",
        description: "description of rocket",
        price: "-98",
        quantity:"10"
      }
    )
    .set('Authorization', `${token}`)

    expect(response.status).toBe(400)
  });

  it('Should return 401 for user non authorize', async () =>{
    const response = await request(app)
    .post('/api/v1/admin/create-products')
    .send(
      {
        name: "rocket",
        description: "description of rocket",
        price: "100",
        quantity:"10"
      }
    )
    .set('Authorization', `${token}`)

    expect(response.status).toBe(403)
  })

  it('Should return 201 for product created', async () =>{
    const response = await request(app)
    .post('/api/v1/admin/create-products')
    .send(
      {
        name: "rocket",
        description: "description of rocket",
        price: "100",
        quantity:"10"
      }
    )
    .set('Authorization', `${adminToken}`)

    expect(response.status).toBe(201)
  })
});


afterEach(() => {
  jest.clearAllTimers();
});

