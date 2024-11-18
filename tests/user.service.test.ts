import request from 'supertest';
import app from "../src/app"


var token: string;
var adminToken: string;

beforeEach(() => {
  jest.setTimeout(5000);
});

describe('POST /api/v2/register', () => {
  it('should return 400 for invalid credentials', async () => {
    const response = await request(app)
      .post('/api/v2/register')
      .send({
        name: "joe",
        email: "userexample.com",
        charge: "employe",
        password: "string"
      });

    expect(response.status).toBe(400);
    //expect(response.body.message).toBe('Login successful');
  });

  it('should return 200 for valid credentials', async () => {
    const response = await request(app)
      .post('/api/v2/register')
      .send({
        name: "user1",
        email: "user1@example.com",
        charge: "employe",
        password: "string"
      });
    expect(response.status).toBe(200);
    //expect(response.body.message).toBe('Login successful');
  });

  it('should return 200 for valid credentials', async () => {
    const response = await request(app)
      .post('/api/v2/register')
      .send({
        name: "user3",
        email: "user3@example.com",
        charge: "employe",
        password: "string"
      });
    expect(response.status).toBe(200);
    //expect(response.body.message).toBe('Login successful');
  });


  it('should return 200 for valid credentials', async () => {
    const response = await request(app)
      .post('/api/v2/register')
      .send({
        name: "user2",
        email: "user2@example.com",
        charge: "gestionnaire",
        password: "string"
      });
    expect(response.status).toBe(200);
    //expect(response.body.message).toBe('Login successful');
  });
});

describe('POST /api/v2/login', () => {
  it('Should return 404 for user doesn\'t exists ', async () => {
    const response = await request(app)
      .post('/api/v2/login')
      .send({ email: 'Edwards@gmail.com', password: "abc-123" })
    expect(response.status).toBe(401)
  });

  it('Should return 200 for user exists ', async () => {
    const response = await request(app)
      .post('/api/v2/login')
      .send({ email: 'user2@example.com', password: "string" })
    adminToken = await response.body.jwt;
    expect(response.status).toBe(200);
  });

  it('Should return 200 for user exists ', async () => {
    const response = await request(app)
      .post('/api/v2/login')
      .send({ email: 'user3@example.com', password: "string" })
    token = await response.body.jwt;
    expect(response.status).toBe(200);
  })


});

describe('GET /api/v2/products', () => {
  it('Should return  403 for no token provided ', async () => {
    const response = await request(app)
      .get('/api/v2/products')
    expect(response.status).toBe(401)
  });

  it('Should return 200 for any user\'s role with token ', async () => {
    const response = await request(app)
      .get('/api/v2/products')
      .set('Authorization', `${token}`);

    expect(response.status).toBe(200)
  })
});

describe('Post /api/v2/admin/create-products', () => {
  it('Should return  400 due the invalid field ', async () => {
    const response = await request(app)
      .post('/api/v2/admin/create-products')
      .send(
        {
          name: "rocket",
          description: "description of rocket",
          price: "-98",
          quantity: "10"
        }
      )
      .set('Authorization', `${adminToken}`)

    expect(response.status).toBe(400)
  });

  it('Should return 401 for user non authorize', async () => {
    const response = await request(app)
      .post('/api/v2/admin/create-products')
      .send(
        {
          name: "rocket",
          description: "description of rocket",
          price: "100",
          quantity: "10"
        }
      )
      .set('Authorization', `${token}`)

    expect(response.status).toBe(403)
  })

  it('Should return 201 for product created', async () => {
    const response = await request(app)
      .post('/api/v2/admin/create-products')
      .send(
        {
          name: "rocket",
          description: "description of rocket",
          price: "100",
          quantity: "10"
        }
      )
      .set('Authorization', `${adminToken}`)

    expect(response.status).toBe(201)
  })
});

describe('PUT /api/v2/admin/products/2', () => {
  it('Should return  200 for products has been updated ', async () => {
    const response = await request(app)
      .put('/api/v2/admin/products/2')
      .send(
        {
          "name": "new-product-name",
          "category": "fire",
          "quantity": 11,
          "price": 99,
          "description": "description..."
        }
      )
      .set('Authorization', `${adminToken}`)
    expect(response.status).toBe(200)
  });

});

describe('Delete /api/v2/admin/products/0', () => {
  it('Should return  200 for products has been deleted ', async () => {
    const response = await request(app)
      .delete('/api/v2/admin/delete-products/0')
      .set('Authorization', `${adminToken}`)
    expect(response.status).toBe(200)
  });

  it('Should return  404 for product not found ', async () => {
    const response = await request(app)
      .put('/api/v2/admin/products/0')
      .set('Authorization', `${adminToken}`)
    expect(response.status).toBe(404)
  });

});
// -------------------------- Tests de sécurité ---------------------------------------------

describe('Delete /api/v2/admin/products/0', () => {
  it('should prevent SQL injection in price filter', async () => {
    const maliciousQuery = "' OR 1=1 --";
    const response = await request(app)
      .get(`/api/v2/products?minPrice=${maliciousQuery}&maxPrice=30.00&minStock=10&maxStock=100`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(403);
  });

  it('should prevent SQL injection in stock filter', async () => {
    const maliciousQuery = "' OR 1=1 --";
    const response = await request(app)
      .get(`/api/v2/products?minPrice=10.00&maxPrice=30.00&minStock=${maliciousQuery}&maxStock=100`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.status).toBe(403);
  });

  it('should prevent SQL injection when updating a product', async () => {
    const maliciousId = "' OR 1=1 --";
    const response = await request(app)
      .delete(`/api/v2/admin/delete-products/${maliciousId}`)
      .set('Authorization', `Bearer ${adminToken}`);
  
    expect(response.status).toBe(403);
  });
  
})

afterEach(() => {
  jest.clearAllTimers();
});

