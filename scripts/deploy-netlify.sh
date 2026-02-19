#!/bin/bash
# Deploy to Netlify via CLI
# Docs: https://cli.netlify.com/commands/deploy/
#
# Usage:
#   ./scripts/deploy-netlify.sh           # deploy production
#   ./scripts/deploy-netlify.sh --draft   # deploy draft (preview)
#
# Environment variables (optional, useful for CI):
#   NETLIFY_AUTH_TOKEN      - auth token so CLI skips interactive login
#   NETLIFY_SITE_ID         - target site id (skips site prompt)
#   NETLIFY_DEPLOY_MESSAGE  - custom message shown in deploy log

set -e

# --- Load Netlify vars from .env (optional) -----------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="$PROJECT_ROOT/.env"
if [[ -f "$ENV_FILE" ]]; then
  for var in NETLIFY_SITE_ID NETLIFY_AUTH_TOKEN NETLIFY_DEPLOY_MESSAGE; do
    val=$(grep -E "^${var}=" "$ENV_FILE" 2>/dev/null | cut -d= -f2- | sed "s/^['\"]//;s/['\"]$//")
    [[ -n "$val" ]] && export "$var=$val"
  done
fi

# --- Prerequisites -----------------------------------------------------------
if ! command -v node >/dev/null 2>&1; then
  echo "Error: node is not installed." >&2
  exit 1
fi

if ! command -v pnpm >/dev/null 2>&1; then
  echo "Error: pnpm is not installed (npm install -g pnpm)." >&2
  exit 1
fi

# --- Parse flags --------------------------------------------------------------
PROD_FLAG="--prod"
if [[ "${1:-}" == "--draft" ]]; then
  PROD_FLAG=""
  echo "Mode: DRAFT deploy (preview URL)"
else
  echo "Mode: PRODUCTION deploy"
fi

# --- Build --------------------------------------------------------------------
echo ""
echo "==> Building project..."
pnpm run build
echo "==> Build finished."

# --- Compose deploy command ---------------------------------------------------
DEPLOY_CMD=(pnpm dlx netlify-cli deploy --no-build)

if [[ -n "$PROD_FLAG" ]]; then
  DEPLOY_CMD+=("$PROD_FLAG")
fi

if [[ -n "${NETLIFY_AUTH_TOKEN:-}" ]]; then
  DEPLOY_CMD+=(--auth "$NETLIFY_AUTH_TOKEN")
fi

if [[ -n "${NETLIFY_SITE_ID:-}" ]]; then
  DEPLOY_CMD+=(--site "$NETLIFY_SITE_ID")
fi

if [[ -n "${NETLIFY_DEPLOY_MESSAGE:-}" ]]; then
  DEPLOY_CMD+=(--message "$NETLIFY_DEPLOY_MESSAGE")
fi

# --- Deploy -------------------------------------------------------------------
echo ""
echo "==> Deploying to Netlify..."
echo "    ${DEPLOY_CMD[*]}"
echo ""

"${DEPLOY_CMD[@]}"

echo ""
echo "==> Deploy finished."
