#!/usr/bin/env python3
"""
Print a fresh GCP access token from the service account.
Used by generate-campaign.ts to call Vertex AI Imagen + Gemini endpoints.

Usage:
    python3 scripts/get-gcp-token.py
"""
import sys
from pathlib import Path
from google.oauth2 import service_account
from google.auth.transport.requests import Request

SERVICE_ACCOUNT_FILE = Path(__file__).parent.parent / ".google-veo-service-account.json"

if not SERVICE_ACCOUNT_FILE.exists():
    print(f"ERROR: service account file not found at {SERVICE_ACCOUNT_FILE}", file=sys.stderr)
    sys.exit(1)

creds = service_account.Credentials.from_service_account_file(
    str(SERVICE_ACCOUNT_FILE),
    scopes=["https://www.googleapis.com/auth/cloud-platform"],
)
creds.refresh(Request())
print(creds.token)
