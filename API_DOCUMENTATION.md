I-Vendor API Documentation (selected endpoints)

Seed endpoints:
- POST /api/v1/seed/populate — run seed SQL
- DELETE /api/v1/seed/reset — reset DB
- GET /api/v1/seed/status — return counts

Ideas:
- POST /api/v1/ideas/recommend — body: {department,budget,skills}
- GET /api/v1/ideas
- GET /api/v1/ideas/:id
- POST /api/v1/ideas/select — body: {idea_id} (auth required)

Materials:
- GET /api/v1/materials/vendors
- POST /api/v1/materials/order — (auth required)
- GET /api/v1/materials/commissions

Cleanliness:
- POST /api/v1/cleanliness/report (auth)
- GET /api/v1/cleanliness (auth)
- PUT /api/v1/cleanliness/:id/resolve (auth)

RBVM:
- POST /api/v1/rbvm/return (auth)
- GET /api/v1/rbvm/history (auth)
