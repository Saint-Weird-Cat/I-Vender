# I-Vendor Deployment Guide

## Local Development

### Using Docker Compose
```bash
chmod +x ./launch-complete.sh
./launch-complete.sh
```

Flags:
- `--reset`: Drop all volumes and reseed
- `--stop`: Stop all services
- `--status`: Show container status
- `--empty`: Start without seeding
- `--help`: Show help

### Manual Docker
```bash
docker-compose up -d --build
docker exec $(docker ps -q -f name=backend) node src/scripts/migrate.js
docker exec $(docker ps -q -f name=backend) node src/scripts/seed.js
```

## GitHub Container Registry (GHCR)

Images are published on every push to `main`:
- `ghcr.io/{owner}/ivendor-backend:latest`
- `ghcr.io/{owner}/ivendor-frontend:latest`
- `ghcr.io/{owner}/ivendor-mock-api:latest`

### Pull Images
```bash
docker pull ghcr.io/{owner}/ivendor-backend:latest
```

## Kubernetes Deployment

### Requirements
- k8s cluster (local minikube or cloud)
- kubectl configured
- Images available in registry

### Deploy Manifests
```bash
kubectl apply -f k8s/
```

### Set Up GitHub Secrets for Auto-Deploy
1. Create a kubeconfig for your cluster
2. Base64 encode it: `cat ~/.kube/config | base64`
3. Add as GitHub secret `KUBE_CONFIG`
4. Automatic deployment triggers on push to `main`

### Monitor Deployment
```bash
kubectl get deployments
kubectl logs -f deployment/ivendor-backend
```

## Environment Variables

### Backend
- `DATABASE_URL`: Postgres connection string
- `JWT_SECRET`: Secret for JWT signing
- `PORT`: Backend port (default 4000)
- `MINIO_ENDPOINT`: MinIO endpoint
- `MINIO_ACCESS_KEY`: MinIO access key
- `MINIO_SECRET_KEY`: MinIO secret
- `MINIO_BUCKET`: MinIO bucket name

### Frontend
- `VITE_API_BASE`: Backend API URL (default http://localhost:4000)

## CI/CD Pipeline

Workflows run on push and PRs:

1. **ci.yml**
   - Runs backend Jest tests
   - Runs frontend Vitest tests
   - Builds frontend production bundle

2. **publish.yml**
   - Builds and pushes Docker images to GHCR
   - Optionally deploys to k8s (if `KUBE_CONFIG` secret set)

## Troubleshooting

### Database Connection Issues
```bash
docker-compose logs postgres
# Check DATABASE_URL env var matches docker-compose config
```

### MinIO Access
```bash
# Access MinIO console
http://localhost:9000
# Credentials: minioadmin / minioadmin
```

### Frontend API Errors
- Check backend is running: `curl http://localhost:4000/health`
- Verify VITE_API_BASE if using non-standard port
- Check browser console for CORS issues

### Tests Fail
```bash
# Backend
cd ivendor-starter/backend
npm install
npm test

# Frontend
cd ivendor-starter/frontend
npm install
npm test -- --run
```
