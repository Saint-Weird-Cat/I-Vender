const request = require('supertest');
const app = require('../index');

describe('backend health', ()=>{
  it('GET /health', async ()=>{
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  })
})
