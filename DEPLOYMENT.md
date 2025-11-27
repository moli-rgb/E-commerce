# Vercel Deployment Checklist

## ✅ Pre-Deployment Checklist

### Backend Deployment
- [ ] Create `vercel.json` in backend directory ✅ (Already exists)
- [ ] Push latest code to GitHub
- [ ] Deploy backend to Vercel
- [ ] Add environment variables in Vercel:
  - `MONGO_URI` - MongoDB Atlas connection string
  - `JWT_SECRET` - Secret key for JWT tokens
  - `NODE_ENV` - Set to `production`
- [ ] Verify deployment at: `https://your-backend.vercel.app/api/health`

### Frontend Deployment
- [ ] Push latest code to GitHub
- [ ] Deploy frontend to Vercel
- [ ] Add environment variable in Vercel:
  - `NEXT_PUBLIC_API_URL` - Your backend URL (e.g., `https://your-backend.vercel.app/api`)
- [ ] Verify deployment at: `https://your-frontend.vercel.app`

### MongoDB Atlas Setup
- [ ] Create MongoDB Atlas account
- [ ] Create a cluster
- [ ] Create database user with read/write permissions
- [ ] Add Network Access: `0.0.0.0/0` (allow from anywhere)
- [ ] Get connection string and update `MONGO_URI`
- [ ] Seed database with products (run `node seedProducts.js`)

## 🔧 Post-Deployment Steps

1. **Test Backend Health:**
   ```
   https://your-backend.vercel.app/api/health
   ```
   Expected: `{"status":"OK","database":"Connected",...}`

2. **Test Products API:**
   ```
   https://your-backend.vercel.app/api/products
   ```
   Expected: Array of products or `[]`

3. **Test Frontend:**
   ```
   https://your-frontend.vercel.app
   ```
   Expected: Products load without errors

## 🚨 Common Issues

### Issue: 500 Error on /api/products
**Cause:** MongoDB not connected or environment variables missing
**Fix:** Check `MONGO_URI` in Vercel environment variables and redeploy

### Issue: CORS Error
**Cause:** Frontend URL not allowed by backend
**Fix:** Update `server.js` CORS configuration to include your frontend URL

### Issue: Products not loading
**Cause:** Empty database
**Fix:** Run seed script: `node backend/seedProducts.js`

### Issue: "API is running..." but no data
**Cause:** Wrong `NEXT_PUBLIC_API_URL` in frontend
**Fix:** Verify environment variable includes `/api` at the end

## 📋 Environment Variables Reference

### Backend (.env or Vercel)
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_minimum_32_characters_long
NODE_ENV=production
```

### Frontend (.env.local or Vercel)
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app/api
```

## 🔗 Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- MongoDB Atlas: https://cloud.mongodb.com
- GitHub Repository: https://github.com/moli-rgb/E-commerce

## 📝 Notes

- Always redeploy after changing environment variables
- Use `/api/health` endpoint to verify backend status
- Check Vercel function logs for detailed error messages
- MongoDB Atlas free tier is sufficient for development
