const request = require('supertest')
const app = require('../../index')

describe('Ideas Routes', ()=>{
  it('GET /api/v1/ideas returns ideas', async ()=>{
    const res = await request(app).get('/api/v1/ideas')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('POST /api/v1/ideas requires auth', async ()=>{
    const res = await request(app).post('/api/v1/ideas').send({ title: 'test' })
    expect(res.statusCode).toBe(401)
  })
})

describe('Materials Routes', ()=>{
  it('GET /api/v1/materials/vendors returns vendors', async ()=>{
    const res = await request(app).get('/api/v1/materials/vendors')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })
})

describe('Mentors Routes', ()=>{
  it('GET /api/v1/mentors returns mentors', async ()=>{
    const res = await request(app).get('/api/v1/mentors')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })
})
