# 🔧 Fix: "No Output Directory named 'dist' found"

## ✅ Quick Fix

I've created a `vercel.json` file that fixes this error!

---

## 📋 What To Do Now

### If deploying via Vercel Dashboard (GitHub):

1. **Re-download your code** from Figma Make
2. The new `vercel.json` file will be included
3. **Push to GitHub** again:
   ```bash
   git add vercel.json
   git commit -m "Add Vercel configuration"
   git push
   ```
4. **Redeploy** in Vercel (it will auto-redeploy if connected to GitHub)

---

### If deploying via Vercel CLI:

The `vercel.json` file is already in your project! Just run:

```bash
vercel --prod
```

The deployment should work now! ✅

---

## 🤔 What This File Does

The `vercel.json` file tells Vercel:

```json
{
  "buildCommand": "npm run build",    // How to build your app
  "outputDirectory": "dist",          // Where the built files are
  "framework": "vite",                // What framework you're using
  "installCommand": "npm install"     // How to install dependencies
}
```

This is necessary because Figma Make projects have a special structure that Vercel needs to understand.

---

## ✅ Expected Result

After adding `vercel.json`, your deployment should:

1. ✅ Build successfully (you already had this!)
2. ✅ Find the `dist` folder (this was the problem)
3. ✅ Deploy your app (success!)

---

## 🆘 Still Getting Errors?

### Double-check these files exist in your project:
- [ ] `vercel.json` (I just created this)
- [ ] `App.tsx` (your main component)
- [ ] `styles/globals.css` (your styles)

### Make sure you've set environment variables:
Go to Vercel Dashboard → Your Project → Settings → Environment Variables

Add these 4 variables:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_DB_URL`

---

## 🎉 After Deployment

Once deployed successfully, test your app:

1. Visit your Vercel URL
2. Enter your name on the homepage
3. Create a test group
4. Verify the calendar appears
5. Click some time blocks to mark availability
6. Check that it saves (no console errors)

---

**You're almost there!** 🚀

The `vercel.json` file should fix the deployment error.
