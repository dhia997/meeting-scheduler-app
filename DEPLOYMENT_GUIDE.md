# Deployment Guide 🚀

## Quick Start: Get Your App Running

### Step 1: Update Frontend Configuration ⚙️

Since your backend is already deployed on Render, you need to configure the frontend to connect to it.

1. **Find your Render backend URL**:
   - Go to your Render dashboard
   - Click on your backend service
   - Copy the URL (e.g., `https://your-app-name.onrender.com`)

2. **Update frontend/.env file**:
   ```bash
   cd frontend
   nano .env  # or use any text editor
   ```
   
   Change this line:
   ```env
   REACT_APP_API_URL=http://localhost:5001
   ```
   
   To your Render URL:
   ```env
   REACT_APP_API_URL=https://your-app-name.onrender.com
   ```

3. **Save the file**

### Step 2: Start Your Frontend 🎨

```bash
cd frontend
npm start
```

The app will open at `http://localhost:3000`

### Step 3: Test It Out! 🧪

#### Test with Two Browser Windows:

**Window 1 - Recruiter:**
1. Go to `http://localhost:3000`
2. Click "Recruiter"
3. Enter name: "John"
4. Create a meeting request:
   - Student email: `student@test.com`
   - Pick a date and time
5. Click "Send Meeting Request"

**Window 2 - Student:**
1. Open another browser window (or use phone!)
2. Go to `http://localhost:3000`
3. Click "Student"
4. Enter email: `student@test.com`
5. **You'll see the notification appear instantly!** 🔔
6. Click "Accept"
7. Both windows now show "Join Meeting" button!

---

## Sharing with Friends 📱

### Option A: Quick Testing with ngrok (5 minutes)

Perfect for testing with friends without deploying:

1. **Install ngrok**:
   ```bash
   # Download from https://ngrok.com/download
   # Or install via snap:
   sudo snap install ngrok
   ```

2. **Expose your local frontend**:
   ```bash
   # In a new terminal, while frontend is running:
   ngrok http 3000
   ```

3. **Share the URL**:
   - ngrok will show a URL like: `https://abc123.ngrok.io`
   - Send this URL to your friend
   - They can open it on their phone!

4. **Test the flow**:
   - You (on PC): Open recruiter interface, create meeting
   - Friend (on phone): Opens student interface with their email
   - Friend receives INSTANT notification!
   - Friend accepts → both can join meeting!

### Option B: Deploy Frontend (Permanent Solution)

Deploy your frontend so anyone can access it anytime:

#### Deploy to Vercel (Easiest - 2 minutes):

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   cd frontend
   vercel
   ```

3. **Follow prompts**:
   - Login/signup
   - Set project name
   - Accept defaults
   - Done! You'll get a URL like: `https://your-app.vercel.app`

4. **Share this URL** with anyone!

#### Deploy to Netlify:

1. **Build the app**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `build` folder
   - Done! Get your URL

---

## Backend Configuration (Render) 🔧

Your backend is already on Render, but make sure these environment variables are set:

1. Go to your Render dashboard
2. Click your backend service
3. Go to "Environment" tab
4. Add these variables:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/meeting-app?retryWrites=true&w=majority
PORT=5001
```

5. Click "Save Changes"
6. Service will redeploy automatically

---

## Complete Flow Example 🎯

### Scenario: You (PC) + Friend (Phone)

1. **You deploy/start frontend** → Get URL
2. **You open URL** → Select "Recruiter" → Enter name "Alice"
3. **Send URL to friend** via WhatsApp/SMS
4. **Friend opens URL on phone** → Select "Student" → Enter email "bob@test.com"
5. **You create meeting** for "bob@test.com" at 3:00 PM tomorrow
6. **Friend's phone** → 🔔 INSTANT notification appears!
7. **Friend clicks "Accept"**
8. **Your PC** → 🔔 "Student accepted your meeting!"
9. **Both click "Join Meeting"** → Opens Jitsi video call
10. **You're now in a video meeting!** 🎥

---

## Troubleshooting 🔧

### "Cannot connect to server"

**Problem**: Frontend can't reach backend

**Solution**:
```bash
# Check frontend/.env has correct URL
cat frontend/.env

# Should show:
REACT_APP_API_URL=https://your-render-app.onrender.com

# NOT localhost!
```

### "Notifications not appearing"

**Solution**:
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Look for "WebSocket connection failed"
4. Make sure backend URL is correct
5. Try refreshing the page

### "Friend can't access my app"

**Using localhost**:
- `localhost` only works on your computer
- Use ngrok or deploy to Vercel

**Using ngrok**:
- ngrok URLs expire after 8 hours (free plan)
- Start ngrok again to get new URL

**Best solution**: Deploy to Vercel (permanent)

### "Backend sleeping on Render"

Render free tier sleeps after 15 minutes of inactivity:

**Solution**: 
- First load might take 30-60 seconds
- Just wait, it will wake up
- Or upgrade to paid plan ($7/month)

---

## Architecture Overview 🏗️

```
┌─────────────────┐
│   Your PC       │
│  (Recruiter)    │
│  Browser        │
└────────┬────────┘
         │
         ├─── HTTP/REST ────→  ┌──────────────────┐
         │                     │   Render         │
         └── WebSocket ──────→ │   Backend        │
                               │   (Node.js)      │
         ┌── WebSocket ──────→ └────────┬─────────┘
         │                              │
         ├─── HTTP/REST ────→           │
         │                              ↓
┌────────┴────────┐            ┌───────────────┐
│ Friend's Phone  │            │ MongoDB Atlas │
│  (Student)      │            │  (Database)   │
│  Browser        │            └───────────────┘
└─────────────────┘

Real-time flow:
1. Recruiter creates meeting → Saved to MongoDB
2. Backend emits WebSocket event
3. Student receives instant notification (no refresh!)
4. Student accepts → WebSocket updates recruiter instantly
```

---

## Environment Variables Summary 📝

### Backend (Render Dashboard):
```env
MONGO_URI=mongodb+srv://...
PORT=5001
```

### Frontend (.env file):
```env
REACT_APP_API_URL=https://your-render-app.onrender.com
```

---

## Quick Commands Reference 📋

```bash
# Start frontend locally
cd frontend
npm start

# Deploy to Vercel
cd frontend
vercel

# Expose localhost with ngrok
ngrok http 3000

# Build frontend for production
cd frontend
npm run build

# Check backend logs on Render
# Go to Render dashboard → Your service → Logs tab
```

---

## Support & Next Steps 💡

### Working Features ✅
- Real-time notifications (Socket.io)
- Meeting scheduling
- Accept/Decline meetings
- Video conferencing (Jitsi)
- Mobile responsive
- Cross-device communication

### What You Can Do Now:
1. Update frontend/.env with your Render URL
2. Start frontend: `npm start`
3. Test with two browser windows
4. Share with friend using ngrok
5. Deploy to Vercel for permanent access

---

**Ready to test?** Just update that `.env` file and run `npm start`! 🚀
