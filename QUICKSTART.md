# Quick Start Guide ⚡

## 🎯 Goal
Get your meeting app running in 3 steps and test it with a friend!

---

## Step 1: Configure Backend URL (1 minute) ⚙️

Your backend is deployed on Render. Now connect the frontend to it:

```bash
# Edit the frontend/.env file
nano frontend/.env

# OR open it in any text editor
```

**Change this line**:
```env
REACT_APP_API_URL=http://localhost:5001
```

**To your Render URL** (replace with your actual URL):
```env
REACT_APP_API_URL=https://meeting-backend-2-xxxx.onrender.com
```

💡 **How to find your Render URL**:
- Go to https://dashboard.render.com
- Click on your backend service
- Copy the URL at the top (looks like `https://something.onrender.com`)

---

## Step 2: Start the Frontend (30 seconds) 🚀

```bash
cd frontend
npm start
```

Your browser will automatically open to `http://localhost:3000`

---

## Step 3: Test It! (2 minutes) 🧪

### Quick Test (Same Computer):

1. **Open TWO browser windows** side by side

2. **Window 1 (Left) - Be the Recruiter**:
   - Click "Recruiter" button
   - Enter name: "Alice"
   - Fill in meeting form:
     - Student email: `test@student.com`
     - Pick tomorrow's date
     - Pick any time
   - Click "Send Meeting Request"

3. **Window 2 (Right) - Be the Student**:
   - Click "Student" button
   - Enter email: `test@student.com`
   - **BOOM!** 🔔 You'll see the notification appear instantly!
   - Click "Accept"

4. **Both windows**:
   - Now both show "Join Meeting" button
   - Click it to start a video call!

**✅ If you see the notification appear instantly, IT WORKS!**

---

## Share with Friend 📱

### Method 1: Using ngrok (Quick Test)

1. **Install ngrok**:
   ```bash
   # Download from: https://ngrok.com/download
   # Or:
   sudo snap install ngrok
   ```

2. **Start ngrok** (in new terminal, keep frontend running):
   ```bash
   ngrok http 3000
   ```

3. **Copy the URL** shown (e.g., `https://abc123.ngrok-free.app`)

4. **Send to friend** via WhatsApp/SMS

5. **Test the real scenario**:
   - You: Open recruiter interface
   - Friend: Opens student interface on their phone
   - You: Create meeting for friend's email
   - Friend: Gets instant notification! 🎉

### Method 2: Deploy to Vercel (Permanent)

```bash
# One-time setup
npm install -g vercel

# Deploy
cd frontend
vercel

# Follow prompts, get permanent URL
# Share that URL with anyone!
```

---

## Troubleshooting 🔧

### "Cannot connect to backend"
❌ **Problem**: Frontend can't reach backend

✅ **Fix**: Check `frontend/.env` has your Render URL (not localhost!)

### "Page loading forever"
❌ **Problem**: Render backend is sleeping (free tier)

✅ **Fix**: Wait 30-60 seconds for first load, it's waking up!

### "No notification"
❌ **Problem**: Student email doesn't match

✅ **Fix**: Use EXACT same email in both forms

---

## What You Built 🎨

- ✅ Real-time meeting scheduler
- ✅ Instant notifications (WebSocket)
- ✅ Two interfaces (Recruiter + Student)
- ✅ Video conferencing (Jitsi)
- ✅ Works across devices (PC ↔ Phone)
- ✅ MongoDB cloud database
- ✅ Production-ready backend (Render)

---

## The Flow 🔄

```
1. Recruiter creates meeting on PC
   ↓
2. Backend saves to MongoDB
   ↓
3. Backend sends WebSocket event
   ↓
4. Student receives INSTANT notification (no refresh!)
   ↓
5. Student accepts
   ↓
6. Both users notified in real-time
   ↓
7. Both can join video meeting
```

---

## Next Steps 🚀

1. ✅ Test with two browser windows (5 min)
2. ✅ Test with a friend using ngrok (10 min)
3. ✅ Deploy to Vercel for permanent URL (5 min)
4. ✅ Share with the world! 🌍

---

## Need Help? 🆘

Check the full guides:
- `README.md` - Full documentation
- `DEPLOYMENT_GUIDE.md` - Detailed deployment instructions

---

**Ready?** Just update that `.env` file and run `npm start`! 🎯
