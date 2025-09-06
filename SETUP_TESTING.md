# VeriAI Setup & Testing Guide 🛠️

## Quick Start (For Demo & Testing)

### Option 1: Use Live Demo (Recommended)

```bash
# No setup required - visit the live demo
🌐 https://veriai.vercel.app
```

### Option 2: Local Development Setup

#### Prerequisites

- Node.js 18+
- Git
- MongoDB (local or Atlas)
- Web3 wallet (MetaMask recommended)

#### 1. Clone Repository

```bash
git clone https://github.com/BenStacks/veriai.git
cd veriai
```

#### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Environment configuration
cp .env.example .env

# Edit .env with your configuration
nano .env
```

**Required Environment Variables:**

```env
# Database
MONGODB_URI=mongodb://localhost:27017/veriai

# AI API Keys (at least one required for testing)
OPENAI_API_KEY=your_openai_key
GEMINI_API_KEY=your_gemini_key
GROQ_API_KEY=your_groq_key

# Blockchain (for production features)
PRIVATE_KEY=your_private_key
VERI_AI_CONTRACT_ADDRESS=contract_address

# Server
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# Security
JWT_SECRET=your_jwt_secret_here
```

```bash
# Start backend server
npm run dev
```

#### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Environment configuration
cp .env.local.example .env.local

# Edit .env.local
nano .env.local
```

**Frontend Environment Variables:**

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Web3Auth (Use provided test credentials)
NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=BJvVmTkiceZR14LRoQnXI1LQr8-1egUYqZs6JxM9kdSLKNbg5MCbtTLS5v93mgIhaR79pcv9g4JuK5Hws4-V-jE

# Blockchain Networks
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_FLARE_RPC_URL=https://flare-api.flare.network/ext/C/rpc
```

```bash
# Start frontend development server
npm run dev
```

#### 4. Access Local Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api-docs

## Testing Scenarios

### 🧪 **Test Case 1: Basic AI Verification**

**Objective**: Verify AI content generation and certification

**Steps**:

1. Connect wallet using Web3Auth
2. Navigate to "Generate" page
3. Enter test prompt: `"Explain blockchain consensus mechanisms"`
4. Select AI model: `GPT-4`
5. Click "Generate & Verify"
6. Wait for verification completion (~30-60 seconds)
7. Verify NFT certificate creation

**Expected Results**:

- ✅ AI content generated successfully
- ✅ Verification process completes
- ✅ NFT certificate appears in dashboard
- ✅ Content hash matches generated content

### 🧪 **Test Case 2: Web3Auth Integration**

**Objective**: Test multi-chain wallet connection

**Steps**:

1. Visit application homepage
2. Click "Connect Wallet"
3. Choose "Google" login option
4. Complete OAuth flow
5. Verify wallet addresses for both chains
6. Test transaction signing capability

**Expected Results**:

- ✅ Google OAuth completes successfully
- ✅ Ethereum address generated
- ✅ Solana address generated
- ✅ User session persisted
- ✅ Transaction signing works

### 🧪 **Test Case 3: Marketplace Functionality**

**Objective**: Test NFT marketplace operations

**Steps**:

1. Ensure wallet is connected
2. Navigate to "Marketplace"
3. Browse available NFTs
4. Click "Buy with SOL" on any NFT
5. Test Solana Pay modal
6. Complete or cancel transaction

**Expected Results**:

- ✅ NFTs display correctly
- ✅ Solana Pay modal opens
- ✅ QR code generates
- ✅ Modal can be closed properly
- ✅ Transaction flow works

### 🧪 **Test Case 4: Real-time Updates**

**Objective**: Test WebSocket functionality

**Steps**:

1. Open browser developer tools (Network tab)
2. Start a verification request
3. Monitor WebSocket connections
4. Watch for real-time status updates

**Expected Results**:

- ✅ WebSocket connection established
- ✅ Real-time status updates received
- ✅ Progress indicators update
- ✅ Completion notifications work

## API Testing

### Using cURL

```bash
# Health check
curl https://veriai-backend-hv6zjp4xgq-uc.a.run.app/health

# Request verification (requires authentication)
curl -X POST https://veriai-backend-hv6zjp4xgq-uc.a.run.app/api/verification/request \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "prompt": "Test prompt",
    "model": "gpt-3.5-turbo"
  }'
```

### Using Postman

1. Import the OpenAPI spec from `/api-docs`
2. Set environment variables for base URL and auth token
3. Test key endpoints:
   - `POST /api/verification/request`
   - `GET /api/verification/{requestId}`
   - `GET /api/user/{address}/verifications`

## Performance Testing

### Load Testing with Artillery

```bash
# Install artillery
npm install -g artillery

# Create test config
cat > load-test.yml << EOF
config:
  target: 'https://veriai.vercel.app'
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - name: "Homepage load test"
    requests:
      - get:
          url: "/"
EOF

# Run load test
artillery run load-test.yml
```

### Browser Performance

1. Open Chrome DevTools
2. Navigate to Performance tab
3. Start recording
4. Complete a full verification flow
5. Analyze performance metrics

**Target Metrics**:

- Page load time: < 3 seconds
- Time to Interactive: < 5 seconds
- Verification completion: < 90 seconds

## Automated Testing

### Frontend Tests

```bash
cd frontend

# Run all tests
npm test

# Run specific test suites
npm test -- --testNamePattern="Web3Auth"
npm test -- --testNamePattern="Verification"
npm test -- --testNamePattern="Marketplace"

# Coverage report
npm test -- --coverage
```

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run specific test suites
npm test -- --testNamePattern="API"
npm test -- --testNamePattern="Database"
npm test -- --testNamePattern="Services"

# Integration tests
npm run test:integration
```

## Troubleshooting Guide

### Common Issues

#### 1. **Web3Auth Connection Failed**

```bash
# Check browser console for errors
# Verify client ID is correct
# Ensure HTTPS in production
# Clear browser cache and try again
```

#### 2. **API Requests Failing**

```bash
# Check backend server is running
curl http://localhost:3001/health

# Verify CORS configuration
# Check API keys are set correctly
# Review backend logs for errors
```

#### 3. **Verification Timeout**

```bash
# Check AI API keys are valid
# Verify oracle services are running
# Check blockchain network connectivity
# Review verification logs
```

#### 4. **NFT Not Appearing**

```bash
# Ensure verification completed successfully
# Check wallet network is correct
# Verify smart contract addresses
# Check transaction confirmations
```

## Testing Checklist

### Pre-Demo Testing

- [ ] Live demo URL accessible
- [ ] Wallet connection works
- [ ] AI verification completes
- [ ] NFT certificates generate
- [ ] Marketplace functions properly
- [ ] Real-time updates work
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

### Technical Testing

- [ ] API endpoints respond correctly
- [ ] Database operations work
- [ ] Blockchain transactions complete
- [ ] Error handling functions
- [ ] Security measures active
- [ ] Performance within targets
- [ ] Logging and monitoring active

### User Experience Testing

- [ ] Navigation is intuitive
- [ ] Loading states are clear
- [ ] Error messages are helpful
- [ ] Success feedback is visible
- [ ] Mobile experience is smooth
- [ ] Accessibility features work

## Test Data & Credentials

### Test AI Prompts

```
1. "Explain the concept of decentralized autonomous organizations"
2. "Write a technical overview of zero-knowledge proofs"
3. "Create a business plan for a blockchain startup"
4. "Analyze the environmental impact of cryptocurrency mining"
5. "Describe the future of AI in healthcare"
```

### Test Wallet Addresses

```
# Ethereum/Flare (for testing)
0x742d35Cc5f5E7d6B57d8bc9d6B57d8bc9d6B57d8bc9

# Solana (for testing)
9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM
```

## CI/CD Testing

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test VeriAI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - name: Install dependencies
        run: |
          cd backend && npm install
          cd ../frontend && npm install
      - name: Run tests
        run: |
          cd backend && npm test
          cd ../frontend && npm test
```

---

_Setup guide updated: September 2025_
_For technical support: [GitHub Issues](https://github.com/BenStacks/veriai/issues)_
