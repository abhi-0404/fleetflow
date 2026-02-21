# FleetFlow Backend API

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration

4. Start server:
```bash
npm run dev
```

## API Endpoints

### Authentication

#### POST /api/auth/signup
Register a new user

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "manager"
}
```

**Roles:** `manager`, `dispatcher`, `safety_officer`, `financial_analyst`

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "manager"
  }
}
```

#### POST /api/auth/login
Login user

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "manager"
  }
}
```

#### GET /api/auth/me
Get current user (Protected)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "manager"
  }
}
```

#### POST /api/auth/forgot-password
Request password reset

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

## Testing with cURL

### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123","role":"manager"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get Current User
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Role-Based Access Control

Use the `authorize` middleware to restrict routes:

```javascript
const { protect, authorize } = require('./middleware/auth');

router.get('/admin-only', protect, authorize('manager'), (req, res) => {
  res.json({ message: 'Manager only route' });
});
```

## Database

Currently using in-memory storage. Replace `config/db.js` with actual database (PostgreSQL, MongoDB, etc.) in production.
