# 🚀 Deployment Guide for Sync Space

## ⚠️ PREREQUISITE: Setup Supabase Database First!

**BEFORE deploying, you MUST create the database table in Supabase!**

👉 **Follow the instructions in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) first!**

Without the database table, your app will not work. It takes 2 minutes to set up.

---

## ✅ Supabase Status
**Supabase is fully connected and working!** Your backend includes:
- ✨ Key-value store for data persistence
- 🔄 RESTful API endpoints for groups and availability
- 🌐 Edge functions running on Deno
- 🔐 Environment variables already configured

## 📦 Deployment Options

### ⚠️ Important: Vercel Configuration

This project includes a `vercel.json` file that tells Vercel how to build your app. If you get a "No Output Directory" error, make sure this file is included in your repository.

---

### Option 1: Deploy to Vercel via GitHub (Recommended)

#### Step 1: Download Your Code
1. Click the **Download** button in Figma Make
2. Extract the ZIP file to a folder on your computer

#### Step 2: Push to GitHub
```bash
# Navigate to your project folder
cd sync-space

# Initialize git repository
git init

# Add all files
git add .

# Commit your code
git commit -m "Initial commit: Sync Space scheduling app"

# Create a new repository on GitHub.com
# Then connect it to your local repository:
git remote add origin https://github.com/YOUR_USERNAME/sync-space.git
git branch -M main
git push -u origin main
```

#### Step 3: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect the framework settings
5. Add your environment variables:
   - `SUPABASE_URL` - Your Supabase project URL
   - `SUPABASE_ANON_KEY` - Your Supabase anon/public key
   - `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
   - `SUPABASE_DB_URL` - Your Supabase database connection string
6. Click **"Deploy"**

Your app will be live in ~2 minutes! 🎉

---

### Option 2: Deploy Directly with Vercel CLI

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy
```bash
# Navigate to your project folder
cd sync-space

# Login to Vercel
vercel login

# Deploy (follow the prompts)
vercel

# Add environment variables
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add SUPABASE_DB_URL

# Deploy to production
vercel --prod
```

---

## 🔧 Environment Variables

You'll need these Supabase credentials (already configured in Figma Make):

| Variable | Description | Where to Find |
|----------|-------------|---------------|
| `SUPABASE_URL` | Your project URL | Supabase Dashboard → Settings → API |
| `SUPABASE_ANON_KEY` | Public anon key | Supabase Dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key | Supabase Dashboard → Settings → API |
| `SUPABASE_DB_URL` | Database connection string | Supabase Dashboard → Settings → Database |

⚠️ **Important**: Never commit these secrets to Git! They're already in your `.env` file locally.

---

## 🌐 Post-Deployment

After deploying, your Supabase backend will automatically:
- ✅ Handle group creation
- ✅ Manage member joining
- ✅ Store and sync availability data
- ✅ Auto-save user schedules
- ✅ Poll for real-time updates every 5 seconds

---

## 🎨 Features Deployed

Your app includes:
- 🏠 **Beautiful Homepage** - Anime lo-fi aesthetic with glass cards
- 📅 **Weekly Calendar** - Click-and-drag availability selection
- 👥 **Member Management** - See everyone in your group
- ✨ **Smart Suggestions** - Best meeting times highlighted
- 💾 **Auto-Save** - Changes saved automatically
- 📋 **Copy from Last Week** - Reuse previous schedules
- 🔄 **Real-time Sync** - Updates every 5 seconds
- 🎭 **Calm Animations** - Peaceful, gentle interactions

---

## 🆘 Troubleshooting

### Error: "No Output Directory named 'dist' found"
❌ **Problem**: Vercel doesn't know where to find the built files  
✅ **Solution**: Make sure `vercel.json` is included in your repository. If deploying via CLI, the file should already be there. If deploying via GitHub, make sure you committed and pushed the `vercel.json` file.

### Vercel Build Fails
- Make sure all dependencies are in `package.json`
- Check that your Node version is 18+ (Vercel default is 18.x)

### Supabase Connection Issues
- Verify your environment variables are set correctly
- Check that your Supabase project is active
- Ensure the edge function is deployed

### Data Not Saving
- Open browser console to check for API errors
- Verify your Supabase project has the key-value table
- Check that CORS is enabled (already configured)

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

---

## 🎉 You're All Set!

Once deployed, share your Vercel URL with friends and start scheduling!

Example URL: `https://sync-space.vercel.app`

Need help? Check the Vercel deployment logs for detailed error messages.