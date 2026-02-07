# 🗄️ Supabase Database Setup

## ⚠️ IMPORTANT: Create the Database Table First!

Before your app can work, you need to create the key-value store table in your Supabase database.

---

## 📋 Step-by-Step Setup

### Step 1: Go to Supabase Dashboard

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click on **"SQL Editor"** in the left sidebar (or go to **Database** → **Tables**)

---

### Step 2: Create the Table

Copy and paste this SQL into the SQL Editor:

```sql
-- Create the key-value store table
CREATE TABLE kv_store_090a6328 (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);

-- Add an index for faster lookups by key prefix
CREATE INDEX idx_kv_store_key_prefix ON kv_store_090a6328 (key text_pattern_ops);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE kv_store_090a6328 ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow service role full access
CREATE POLICY "Service role has full access"
  ON kv_store_090a6328
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
```

Click **"Run"** or press **Ctrl+Enter** (Cmd+Enter on Mac)

---

### Step 3: Verify the Table

1. Go to **Database** → **Tables** in the left sidebar
2. You should see a table named `kv_store_090a6328`
3. It should have two columns:
   - `key` (text, primary key)
   - `value` (jsonb)

---

## 🔐 Get Your Environment Variables

You'll need these for deployment. Find them in your Supabase Dashboard:

### Navigate to: **Settings** → **API**

Copy these values:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Navigate to: **Settings** → **Database**

Scroll down to **Connection String** and copy the **URI** format:

```env
SUPABASE_DB_URL=postgresql://postgres:[YOUR-PASSWORD]@db.your-project.supabase.co:5432/postgres
```

⚠️ **Important**: Replace `[YOUR-PASSWORD]` with your actual database password!

---

## 🚀 Deploy the Edge Function (Optional but Recommended)

Your backend server needs to be deployed as a Supabase Edge Function. Here's how:

### ⚠️ Important Note About Edge Functions

**The edge function may already be working in Figma Make's environment.** However, when you deploy your frontend to Vercel, you have two options:

#### Option A: Keep Using Figma Make's Edge Function (Temporary)
- The frontend will continue to call the edge function at the Supabase URL in your code
- This works for testing but may not be permanent

#### Option B: Deploy Your Own Edge Function (Production Ready)
- Deploy the server function to your own Supabase project
- This gives you full control and is required for production

### Deploy via Supabase CLI (Recommended)

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Deploy the edge function
supabase functions deploy server

# Set environment variables
supabase secrets set SUPABASE_URL=your-url
supabase secrets set SUPABASE_ANON_KEY=your-anon-key
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-key
```

### Deploy via Supabase Dashboard

1. Go to **Edge Functions** in the left sidebar
2. Click **"Create a new function"**
3. Name it: `server`
4. Copy the contents of `/supabase/functions/server/index.tsx`
5. Paste it into the editor
6. Click **"Deploy"**

⚠️ **Note**: You may also need to upload the `kv_store.tsx` file as a dependency.

---

## ✅ Test Your Setup

### Test 1: Check if the table exists

```sql
SELECT * FROM kv_store_090a6328 LIMIT 1;
```

Should return: Empty result (no error)

### Test 2: Test the Edge Function

After deploying, test the health endpoint:

```bash
curl https://your-project.supabase.co/functions/v1/server/make-server-090a6328/health
```

Should return: `{"status":"ok"}`

### Test 3: Create a test group

```bash
curl -X POST https://your-project.supabase.co/functions/v1/server/make-server-090a6328/groups \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "groupName": "Test Group",
    "userName": "Test User",
    "code": "SYNC-TEST123"
  }'
```

Should return: JSON with group data and memberId

---

## 🆘 Troubleshooting

### Error: "relation kv_store_090a6328 does not exist"
❌ **Problem**: Table not created  
✅ **Solution**: Run the CREATE TABLE SQL from Step 2

### Error: "permission denied for table kv_store_090a6328"
❌ **Problem**: RLS (Row Level Security) is blocking access  
✅ **Solution**: Run the policy creation SQL from Step 2, or disable RLS:
```sql
ALTER TABLE kv_store_090a6328 DISABLE ROW LEVEL SECURITY;
```

### Error: "Invalid API key"
❌ **Problem**: Wrong environment variables  
✅ **Solution**: Double-check your SUPABASE_URL and keys

### Error: "Function not found"
❌ **Problem**: Edge function not deployed  
✅ **Solution**: Deploy the server function using Supabase CLI or Dashboard

---

## 📊 Database Structure

Your app stores data with these key patterns:

```
group:SYNC-ABC123                    → Group metadata
group:SYNC-ABC123:members           → Array of member objects
group:SYNC-ABC123:member:uuid:availability → Member's weekly schedule
```

Example data:

```json
// Key: "group:SYNC-ABC123"
{
  "name": "Study Group",
  "code": "SYNC-ABC123",
  "createdAt": "2026-02-07T12:00:00Z"
}

// Key: "group:SYNC-ABC123:members"
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Alice",
    "joinedAt": "2026-02-07T12:00:00Z"
  }
]

// Key: "group:SYNC-ABC123:member:550e8400-e29b-41d4-a716-446655440000:availability"
[
  {
    "day": "monday",
    "blocks": [
      { "hour": 9, "status": "available" },
      { "hour": 10, "status": "remote" },
      ...
    ]
  },
  ...
]
```

---

## 🎉 You're All Set!

Once you've:
1. ✅ Created the `kv_store_090a6328` table
2. ✅ Copied your environment variables
3. ✅ Deployed the edge function (optional if deploying frontend only)

Your Sync Space app will be fully functional! 🌸

---

## 🔗 Quick Links

- [Supabase Dashboard](https://supabase.com/dashboard)
- [Supabase SQL Editor](https://supabase.com/dashboard/project/_/sql)
- [Supabase Edge Functions](https://supabase.com/dashboard/project/_/functions)
- [Supabase CLI Docs](https://supabase.com/docs/guides/cli)