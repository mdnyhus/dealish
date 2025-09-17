#!/bin/sh
# Wait for Postgres to be ready
echo "Waiting for Postgres..."
while ! pg_isready -h db -p 5432 -U postgres; do
  sleep 1
done
echo "Postgres is up, starting backend"
exec uvicorn main:app --host 0.0.0.0 --port 8000
