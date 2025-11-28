const request = require('supertest')
const app = require('../index')

describe('I-Vendor Backend', ()=>{
  it('GET /health returns ok', async ()=>{
    const res = await request(app).get('/health')
    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBe('ok')
  })

  it('GET /api/v1/ideas returns array', async ()=>{
    const res = await request(app).get('/api/v1/ideas')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('POST /api/v1/auth/register creates user', async ()=>{
    const res = await request(app).post('/api/v1/auth/register').send({
      name: 'Test User',
      email: 'test'+Date.now()+'@example.com',
      password: 'test123'
    })
    expect(res.statusCode).toBe(200)
    expect(res.body.token).toBeDefined()
    expect(res.body.user).toBeDefined()
  })
})
