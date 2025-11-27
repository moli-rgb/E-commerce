# Troubleshooting Guide: 500 Error on Products API

## 🔴 Error: `Failed to load resource: the server responded with a status of 500 ()`

This guide will help you fix the 500 Internal Server Error when fetching products from your deployed backend.

---

## 🔍 Step 1: Check Backend Health

Visit your backend health endpoint to see if it's running:

```
https://your-backend-url.vercel.app/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "database": "Connected",
  "timestamp": "2025-11-27T17:27:11.000Z",
  "environment": "production",
  "mongoConfigured": true
}
```

**If `database: "Disconnected"` or `mongoConfigured: false`** → Go to Step 2

---

## 🔧 Step 2: Configure Vercel Environment Variables

### Backend Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **backend** project
3. Navigate to **Settings** → **Environment Variables**
4. Add the following variables:

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `MONGO_URI` | `mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | `your_super_secret_key_here` | Any random secure string (min 32 chars) |
| `NODE_ENV` | `production` | Environment mode |

5. **Important:** After adding variables, you MUST **redeploy** your backend:
   - Go to **Deployments** tab
   - Click the three dots on the latest deployment
   - Select **Redeploy**

### Frontend Environment Variables

1. Select your **frontend** project in Vercel
2. Go to **Settings** → **Environment Variables**
3. Add:

| Variable Name | Value |
|--------------|-------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend-url.vercel.app/api` |

4. **Redeploy** the frontend

---

## 📊 Step 3: Check MongoDB Atlas Configuration

### Verify Network Access

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Select your cluster
3. Click **Network Access** in the left sidebar
4. Ensure you have one of these:
   - **IP Address:** `0.0.0.0/0` (Allow access from anywhere) ✅ Recommended for Vercel
   - Or add Vercel's IP ranges (more complex)

### Verify Database User

1. Click **Database Access** in the left sidebar
2. Ensure your user has:
   - **Read and write to any database** permissions
   - Correct username and password (match your `MONGO_URI`)

### Get Correct Connection String

1. Click **Database** → **Connect** → **Connect your application**
2. Select **Node.js** driver
3. Copy the connection string
4. Replace `<password>` with your actual password
5. Replace `<dbname>` with `ecommerce` (or your database name)

Example:
```
mongodb+srv://myuser:MyPassword123@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
```

---

## 🗄️ Step 4: Seed Your Database with Products

If your database is empty, you need to add products:

### Option A: Run Seed Script Locally

```bash
cd backend
node seedProducts.js
```

### Option B: Create Products via API

Use Postman or curl to create products:

```bash
# First, register an admin user
curl -X POST https://your-backend-url.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "email": "admin@example.com",
    "password": "admin123",
    "isAdmin": true
  }'

# Then create a product
curl -X POST https://your-backend-url.vercel.app/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Sample Product",
    "description": "A great product",
    "price": 99.99,
    "stockQuantity": 10
  }'
```

---

## 🐛 Step 5: Check Vercel Logs

1. Go to your backend project in Vercel
2. Click **Deployments**
3. Click on the latest deployment
4. Click **View Function Logs**
5. Look for errors like:
   - `❌ MongoDB Connection Error`
   - `MongoServerError: bad auth`
   - `ENOTFOUND` (DNS resolution failed)

Common errors and fixes:

| Error | Fix |
|-------|-----|
| `bad auth: Authentication failed` | Wrong username/password in `MONGO_URI` |
| `ENOTFOUND` | Invalid MongoDB cluster URL |
| `MongoServerError: IP not whitelisted` | Add `0.0.0.0/0` to Network Access |
| `Cannot read property 'find' of undefined` | Database not connected yet |

---

## ✅ Step 6: Test the Fix

1. Visit your health endpoint:
   ```
   https://your-backend-url.vercel.app/api/health
   ```
   Should show `"database": "Connected"`

2. Test products endpoint:
   ```
   https://your-backend-url.vercel.app/api/products
   ```
   Should return an array of products (or empty array `[]`)

3. Visit your frontend:
   ```
   https://your-frontend-url.vercel.app
   ```
   Products should load without errors

---

## 🚀 Quick Fix Checklist

- [ ] MongoDB Atlas Network Access allows `0.0.0.0/0`
- [ ] Database user has correct permissions
- [ ] `MONGO_URI` is set in Vercel backend environment variables
- [ ] `JWT_SECRET` is set in Vercel backend environment variables
- [ ] `NEXT_PUBLIC_API_URL` is set in Vercel frontend environment variables
- [ ] Backend redeployed after adding environment variables
- [ ] Frontend redeployed after adding environment variables
- [ ] `/api/health` shows `"database": "Connected"`
- [ ] Database has at least one product (run seed script)

---

## 📞 Still Having Issues?

### Check Browser Console

Open DevTools (F12) and look for:
- Network tab → Click the failed request → Check Response tab
- Console tab → Look for CORS errors or network errors

### Common Frontend Issues

**CORS Error:**
```javascript
// In backend/server.js, update CORS:
app.use(cors({
  origin: ['https://your-frontend-url.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

**Wrong API URL:**
Check `frontend/.env.local` or Vercel environment variables:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app/api
```
(No trailing slash!)

---

## 📝 Additional Resources

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [MongoDB Atlas Network Access](https://www.mongodb.com/docs/atlas/security/ip-access-list/)
- [Deploying Express on Vercel](https://vercel.com/guides/using-express-with-vercel)

---

**Last Updated:** 2025-11-27
