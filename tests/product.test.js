const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Product = require('../models/Product');

describe('Product API', () => {
  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect(process.env.MONGO_TEST_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    // Close the database connection
    await mongoose.connection.close();
  });

  it('should add a new product', async () => {
    const newProduct = {
      name: 'Test Product',
      description: 'A product for testing',
      price: 100,
      images: [],
      availableSizes: ['S', 'M'],
      stock: 10
    };

    const res = await request(app)
      .post('/api/products/add')
      .send(newProduct)
      .set('Authorization', `Bearer ${testToken}`); // Assuming testToken is set

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test Product');
  });

  it('should fetch a product by id', async () => {
    const product = new Product({
      name: 'Test Product',
      description: 'A product for testing',
      price: 100,
      images: [],
      availableSizes: ['S', 'M'],
      stock: 10
    });
    await product.save();

    const res = await request(app)
      .get(`/api/products/${product._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Test Product');
  });
});
