# ✅ Sync Space Setup Checklist

Follow these steps in order to deploy your app:

---

## 📋 Pre-Deployment Checklist

### 🗄️ Step 1: Setup Supabase Database (REQUIRED!)

**Read: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)**

- [ ] Go to Supabase Dashboard → SQL Editor
- [ ] Run the CREATE TABLE SQL (copy from SUPABASE_SETUP.md)
- [ ] Verify the table `kv_store_090a6328` exists
- [ ] Copy your environment variables from Supabase Dashboard

**Environment Variables Needed:**
- [ ] `SUPABASE_URL`
- [ ] `SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `SUPABASE_DB_URL`

---

### 🚀 Step 2: Deploy Your App

**Read: [DEPLOYMENT.md](./DEPLOYMENT.md)**

#### Option A: GitHub + Vercel (Easiest)
- [ ] Download code from Figma Make
- [ ] Push to GitHub
- [ ] Connect to Vercel
- [ ] Add environment variables in Vercel
- [ ] Deploy!

#### Option B: Vercel CLI
- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Run `vercel` in project folder
- [ ] Add environment variables
- [ ] Deploy with `vercel --prod`

---

## 🧪 Step 3: Test Your Deployment

### Test 1: Homepage Loads
- [ ] Visit your Vercel URL
- [ ] Homepage with glass card appears
- [ ] Enter your name and create a group

### Test 2: Group Creation Works
- [ ] Click "Create Group"
- [ ] You should see the group room with calendar
- [ ] You should see a group code (e.g., SYNC-ABC123)

### Test 3: Availability Selection Works
- [ ] Click on time blocks to mark availability
- [ ] Status should change: null → available → remote → busy → null
- [ ] Changes should save automatically (check browser console for errors)

### Test 4: Multi-User Sync Works
- [ ] Open your app in a second browser/incognito window
- [ ] Join the group with the group code
- [ ] Mark availability in the second window
- [ ] First window should update within 5 seconds
- [ ] "Best times" sidebar should update

---

## 🆘 Common Issues & Fixes

### ❌ Error: "Failed to fetch group data"
**Cause**: Database table doesn't exist or edge function not deployed  
**Fix**: Follow [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) Step 2

### ❌ Error: "relation kv_store_090a6328 does not exist"
**Cause**: Table not created in Supabase  
**Fix**: Run the CREATE TABLE SQL in Supabase SQL Editor

### ❌ Error: "Invalid API key"
**Cause**: Wrong environment variables  
**Fix**: Double-check your Supabase credentials in Vercel

### ❌ Calendar doesn't save changes
**Cause**: Edge function not deployed or wrong service role key  
**Fix**: Check browser console for errors, verify SUPABASE_SERVICE_ROLE_KEY

### ❌ Changes don't sync between users
**Cause**: Polling not working or table permissions issue  
**Fix**: Check browser console, verify RLS policies in Supabase

---

## 🎉 Success!

When everything works, you should see:

✅ Beautiful animated homepage  
✅ Create groups with auto-generated codes  
✅ Join groups with code sharing  
✅ Interactive weekly calendar with drag selection  
✅ Auto-save availability changes  
✅ Real-time sync across multiple users  
✅ Smart "best times" suggestions  
✅ Member list with color avatars  
✅ Copy availability from last week  

---

## 📞 Need Help?

1. Check browser console for error messages
2. Check Vercel deployment logs
3. Check Supabase logs (Dashboard → Logs)
4. Review [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) and [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🔗 Useful Links

- **Supabase Dashboard**: https://supabase.com/dashboard
- **Vercel Dashboard**: https://vercel.com/dashboard
- **SQL Editor**: https://supabase.com/dashboard/project/_/sql
- **Edge Functions**: https://supabase.com/dashboard/project/_/functions

---

**Estimated Setup Time**: 10-15 minutes  
**Difficulty**: Beginner-friendly

Good luck! 🌸✨
