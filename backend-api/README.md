# Portfolio Backend API

Secure backend API for your portfolio website deployed on GitHub Pages.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend-api
npm install
```

### 2. Setup Environment Variables
```bash
cp .env.example .env.local
# Edit .env.local with your actual API keys
```

### 3. Test Locally
```bash
npm run dev
# API will be available at http://localhost:3000
```

### 4. Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Option B: Using Vercel Dashboard
1. Go to https://vercel.com
2. Click "New Project"
3. Import the `backend-api` folder
4. Add environment variables in Settings → Environment Variables
5. Deploy!

## 📡 API Endpoints

### Example Endpoint
- **URL**: `https://your-api.vercel.app/api/example`
- **Method**: GET
- **Response**: JSON

### Contact Form
- **URL**: `https://your-api.vercel.app/api/contact`
- **Method**: POST
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello!"
  }
  ```

## 🔐 Security

- Environment variables are stored securely on Vercel
- CORS is configured for your GitHub Pages domain
- All secrets stay on the server, never exposed to clients

## 📝 Usage in Your Portfolio

```javascript
// In your GitHub Pages frontend code:
async function sendContactForm(data) {
  const response = await fetch('https://your-api.vercel.app/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
}
```

## 🔧 Adding New API Routes

Create a new file in `api/` folder:
```javascript
// api/your-route.js
export default async function handler(req, res) {
  // Your logic here
  res.json({ data: 'Hello' });
}
```

Access at: `https://your-api.vercel.app/api/your-route`
