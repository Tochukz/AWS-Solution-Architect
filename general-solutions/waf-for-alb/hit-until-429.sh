#!/usr/bin/env bash
set -uo pipefail

# Usage:
#   ./hit-until-429.sh https://your-alb-dns-name
#   ./hit-until-429.sh https://your-alb-dns-name/auth/signin
#
# Optional env vars:
#   SLEEP_SECONDS=0.2   # delay between requests (default: 0)
#   MAX_REQUESTS=1000   # safety cap (default: unlimited)

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <base-url-or-full-auth-signin-url>" >&2
  exit 1
fi

input_url="$1"

if [[ "$input_url" == *"/auth/signin" ]]; then
  target_url="$input_url"
else
  target_url="${input_url%/}/auth/signin"
fi

sleep_seconds="${SLEEP_SECONDS:-0}"
max_requests="${MAX_REQUESTS:-}"

count=0
start_epoch="$(date +%s)"

echo "Target: $target_url"
echo "Looping until HTTP 429..."

while true; do
  count=$((count + 1))

  status_code="$(curl -sS -o /dev/null -w "%{http_code}" "$target_url")"
  now="$(date +"%H:%M:%S")"

  echo "[$now] request=$count status=$status_code"

  if [[ "$status_code" == "429" ]]; then
    elapsed=$(( $(date +%s) - start_epoch ))
    echo "Reached 429 after $count requests in ${elapsed}s"
    exit 0
  fi

  if [[ -n "$max_requests" && "$count" -ge "$max_requests" ]]; then
    elapsed=$(( $(date +%s) - start_epoch ))
    echo "Stopped at MAX_REQUESTS=$max_requests without seeing 429 (elapsed ${elapsed}s)" >&2
    exit 2
  fi

  if [[ "$sleep_seconds" != "0" ]]; then
    sleep "$sleep_seconds"
  fi
done
