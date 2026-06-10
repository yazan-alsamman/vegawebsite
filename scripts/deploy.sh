#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/vegacore}"
BRANCH="${BRANCH:-main}"

echo "==> Deploying VegaCore in $APP_DIR"

cd "$APP_DIR"

echo "==> Pulling latest code..."
git fetch origin
git checkout "$BRANCH"
git pull origin "$BRANCH"

echo "==> Installing dependencies..."
npm ci

if [ ! -f .env ]; then
  echo "==> Creating .env from .env.example — EDIT PASSWORDS NOW"
  cp .env.example .env
fi

echo "==> Building frontend..."
npm run build

echo "==> Restarting API + frontend server..."
if command -v pm2 >/dev/null 2>&1; then
  pm2 restart ecosystem.config.cjs || pm2 start ecosystem.config.cjs
  pm2 save
else
  echo "PM2 not found. Start manually: npm run start"
fi

echo "==> Health check..."
sleep 2
curl -sf "http://127.0.0.1:3001/api/health" && echo "" || echo "WARN: health check failed"

echo "==> Deploy complete. Admin: https://vegacore.co/admin/login"
