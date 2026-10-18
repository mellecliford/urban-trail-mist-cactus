#!/bin/sh
set -eu
attempt=1
while [ "$attempt" -le 15 ]; do
  if node scripts/migrate.mjs; then
    break
  fi
  if [ "$attempt" -eq 15 ]; then
    echo "[entrypoint] migrations failed" >&2
    exit 1
  fi
  echo "[entrypoint] database not ready, retry ${attempt}/15" >&2
  attempt=$((attempt + 1))
  sleep 2
done
exec node .output/server/index.mjs
