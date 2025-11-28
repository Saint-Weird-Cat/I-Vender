#!/usr/bin/env bash
set -euo pipefail

HELP="Usage: $0 [--help|--reset|--stop|--status|--empty]"

function help(){
  echo "$HELP"
}

case ${1:-} in
  --help) help; exit 0;;
  --stop)
    docker-compose down
    exit 0;;
  --reset)
    docker-compose down -v
    docker-compose up -d --build
    echo "Waiting for postgres..."
    sleep 8
    echo "Running migrations and seeds..."
    docker exec -it $(docker ps -q -f name=backend) node src/scripts/migrate.js || true
    docker exec -it $(docker ps -q -f name=backend) node src/scripts/seed.js || true
    exit 0;;
  --status)
    docker ps --filter name=ivendor -a
    exit 0;;
  --empty)
    docker-compose up -d --build
    exit 0;;
  *)
    echo "Bringing up stack..."
    docker-compose up -d --build
    echo "health checks:"
    sleep 5
    curl -fsS http://localhost:4000/health || true
    echo "Seeding database (non-blocking)..."
    sleep 2
    curl -sS -X POST http://localhost:4000/api/v1/seed/populate || true
    echo "Done."
    ;;
esac
