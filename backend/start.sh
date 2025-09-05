#!/bin/sh

# VeriAI Backend Startup Script for Cloud Run
# This script loads environment variables from Secret Manager and starts the application

set -e

echo "🚀 Starting VeriAI Backend..."

# Function to load environment variables from mounted secret
load_secrets() {
    if [ -f "/etc/secrets/env" ]; then
        echo "📋 Loading environment variables from Secret Manager..."
        
        # Source the environment variables
        set -a  # automatically export all variables
        source /etc/secrets/env
        set +a  # turn off automatic export
        
        echo "✅ Environment variables loaded successfully"
    else
        echo "⚠️  No secrets file found at /etc/secrets/env"
        echo "   Using environment variables from container"
    fi
}

# Load secrets and start the application
load_secrets

echo "🎯 Starting Node.js application..."
echo "   Environment: ${NODE_ENV:-development}"
echo "   Port: ${PORT:-3001}"

# Start the application
exec npm start
