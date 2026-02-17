# Pre-Launch Checklist ✅

Use this checklist to make sure everything is ready before sharing your app.

---

## 1. Backend Setup (Render) 🔧

- [ ] Backend is deployed on Render
- [ ] Service is running (check dashboard)
- [ ] Environment variables set:
  - [ ] `MONGO_URI` (MongoDB Atlas connection string)
  - [ ] `PORT` (set to 5001 or auto)
- [ ] Health check works: Visit your-backend-url.onrender.com
- [ ] Should see: `{"message":"🚀 API Running! WebSocket ready."}`

**How to check**:
```bash
# Replace with your actual URL
curl https://your-backend-name.onrender.com
```

---

## 2. MongoDB Atlas Setup 🗄️

- [ ] MongoDB Atlas account created
- [ ] Cluster created (Free M0 tier is fine)
- [ ] Database user created with password
- [ ] Network access configured:
  - [ ] IP Whitelist: Add `0.0.0.0/0` (allow all) OR Render IPs
- [ ] Connection string copied to Render environment variables
- [ ] Test connection: Check Render logs for "✅ MongoDB connected!"

**How to check**:
```bash
# Check Render logs
# Go to Render dashboard → Your service → Logs tab
# Look for: ✅ MongoDB connected!
```

---

## 3. Frontend Configuration ⚙️

- [ ] Dependencies installed:
  ```bash
  cd frontend
  npm install
  ```
- [ ] `.env` file created in `frontend/` folder
- [ ] `.env` contains correct backend URL:
  ```env
  REACT_APP_API_URL=https://your-backend-name.onrender.com
  ```
- [ ] ⚠️ **NOT** `http://localhost:5001` (unless testing locally)
- [ ] Save `.env` file

**How to check**:
```bash
cat frontend/.env
# Should show your Render URL
```

---

## 4. Local Testing 🧪

### Test 4.1: Frontend Starts

- [ ] Frontend starts without errors:
  ```bash
  cd frontend
  npm start
  ```
- [ ] Browser opens to `http://localhost:3000`
- [ ] No console errors (F12 → Console)
- [ ] Home page shows two cards: Recruiter and Student

### Test 4.2: Backend Connection

- [ ] Open browser DevTools (F12)
- [ ] Go to Console tab
- [ ] Look for Socket.io connection messages
- [ ] No "Connection refused" errors
- [ ] ✅ Should see: Socket connected (or similar)

### Test 4.3: Recruiter Flow

- [ ] Click "Recruiter" button
- [ ] Enter name (e.g., "Alice")
- [ ] See recruiter dashboard
- [ ] Fill meeting form:
  - [ ] Student email: `test@student.com`
  - [ ] Date: Pick tomorrow
  - [ ] Time: Pick any time
- [ ] Click "Send Meeting Request"
- [ ] Alert appears: "Meeting request sent successfully!"
- [ ] Meeting appears in list below
- [ ] Status shows "PENDING"

### Test 4.4: Student Flow

- [ ] Open NEW browser window (keep recruiter open)
- [ ] Go to `http://localhost:3000`
- [ ] Click "Student" button
- [ ] Enter email: `test@student.com` (same as recruiter form)
- [ ] See student dashboard
- [ ] Meeting request appears in list
- [ ] Shows recruiter name, date, time
- [ ] Status: "PENDING"
- [ ] Two buttons visible: "Accept" and "Decline"

### Test 4.5: Real-Time Notification ⭐

This is the most important test!

**Setup**: Two browser windows side by side

- [ ] Window 1: Recruiter interface (Alice)
- [ ] Window 2: Student interface (test@student.com)

**Test**:
- [ ] Window 1: Create NEW meeting for test@student.com
- [ ] Window 1: Click "Send Meeting Request"
- [ ] ⭐ Window 2: Notification pops up (top-right)
- [ ] ⭐ Window 2: Meeting appears WITHOUT refreshing
- [ ] ⭐ Notification appears in < 1 second

**If notification doesn't appear**:
- Check emails match exactly
- Check console for errors
- Refresh student window and try again
- Wait 30-60s (Render might be waking up)

### Test 4.6: Accept Meeting

- [ ] Window 2 (Student): Click "Accept" button
- [ ] Alert appears: "Meeting accepted!"
- [ ] Status changes to "ACCEPTED"
- [ ] "Join Meeting" button appears
- [ ] "Accept/Decline" buttons disappear
- [ ] ⭐ Window 1 (Recruiter): Alert pops up "Student accepted!"
- [ ] ⭐ Window 1: Status updates to "ACCEPTED" WITHOUT refresh
- [ ] ⭐ Window 1: "Join Meeting" button appears

### Test 4.7: Video Meeting

- [ ] Both windows: Click "Join Meeting" button
- [ ] New tab opens to Jitsi Meet
- [ ] Meeting room loads
- [ ] Can see video/hear audio (if permissions granted)
- [ ] Both users in same meeting room

---

## 5. Cross-Device Testing 📱

### Option A: Using ngrok (Quick Test)

**Setup**:
- [ ] Install ngrok: `sudo snap install ngrok`
- [ ] Frontend running: `cd frontend && npm start`
- [ ] Start ngrok: `ngrok http 3000`
- [ ] Copy ngrok URL (e.g., `https://abc123.ngrok-free.app`)

**Test**:
- [ ] PC: Open ngrok URL → Select Recruiter → Enter name
- [ ] Phone: Open same ngrok URL → Select Student → Enter email
- [ ] PC: Create meeting for phone's email
- [ ] Phone: Notification appears INSTANTLY! 🔔
- [ ] Phone: Click "Accept"
- [ ] PC: Gets notification "Student accepted!"
- [ ] Both: Can join video meeting

### Option B: Deploy and Test

**If deployed to Vercel/Netlify**:
- [ ] Deploy frontend
- [ ] Get deployed URL
- [ ] Test same flow as above with deployed URL

---

## 6. Pre-Deployment Checks 🚀

Before deploying frontend:

- [ ] All local tests pass
- [ ] No console errors
- [ ] Real-time notifications work
- [ ] `.env` has production backend URL (Render)
- [ ] `.gitignore` exists (don't commit .env)
- [ ] Build succeeds:
  ```bash
  cd frontend
  npm run build
  ```
- [ ] No build errors

---

## 7. Deployment 🌐

### Backend (Already Done)
- [x] Backend deployed on Render ✅

### Frontend (Choose One)

**Option A: Vercel** (Recommended)
- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Deploy:
  ```bash
  cd frontend
  vercel
  ```
- [ ] Follow prompts
- [ ] Get deployment URL
- [ ] Test deployed app
- [ ] Share URL with others

**Option B: Netlify**
- [ ] Build app: `npm run build`
- [ ] Go to netlify.com
- [ ] Drag and drop `build/` folder
- [ ] Get deployment URL
- [ ] Test deployed app

**Option C: Render**
- [ ] Push code to GitHub
- [ ] Create new Static Site on Render
- [ ] Build command: `npm run build`
- [ ] Publish directory: `build`
- [ ] Deploy

---

## 8. Post-Deployment Testing 🧪

After deploying frontend:

- [ ] Open deployed URL
- [ ] Home page loads correctly
- [ ] Can select Recruiter role
- [ ] Can create meetings
- [ ] Open on phone/another device
- [ ] Can select Student role
- [ ] Real-time notifications work
- [ ] Can accept meetings
- [ ] Video calling works

---

## 9. Share with Friends 📤

- [ ] Deployed URL is live
- [ ] Test with at least one other person
- [ ] Send URL via:
  - [ ] WhatsApp
  - [ ] Email
  - [ ] SMS
  - [ ] Social media
- [ ] Verify they can:
  - [ ] Open the app
  - [ ] Select role
  - [ ] Receive notifications
  - [ ] Accept meetings
  - [ ] Join video calls

---

## 10. Final Verification ✅

- [ ] ✅ Backend running on Render
- [ ] ✅ MongoDB Atlas connected
- [ ] ✅ Frontend deployed (or running locally with ngrok)
- [ ] ✅ Real-time notifications work (< 1 second)
- [ ] ✅ Cross-device tested (PC ↔ Phone)
- [ ] ✅ Video meetings work
- [ ] ✅ No console errors
- [ ] ✅ Mobile responsive
- [ ] ✅ Friend successfully received notification
- [ ] ✅ Ready to use! 🎉

---

## Common Issues & Quick Fixes 🔧

### Issue: "Cannot connect to backend"
**Check**:
- [ ] `frontend/.env` has correct URL?
- [ ] Backend is running on Render?
- [ ] No typos in URL?

**Fix**: Update `.env` and restart frontend

### Issue: "No notification"
**Check**:
- [ ] Emails match exactly?
- [ ] Console shows Socket.io connected?
- [ ] Backend awake? (check Render dashboard)

**Fix**: Use exact same email, wait for backend to wake

### Issue: "Render backend sleeping"
**Check**:
- [ ] Free tier sleeps after 15 min inactivity

**Fix**: Wait 30-60s for first request, or upgrade plan

---

## Maintenance Checklist 🛠️

### Daily (If Active Users)
- [ ] Check Render dashboard (backend status)
- [ ] Monitor error logs

### Weekly
- [ ] Review MongoDB Atlas usage
- [ ] Check for npm security updates:
  ```bash
  npm audit
  ```

### Monthly
- [ ] Update dependencies (if needed)
- [ ] Review Render free tier limits
- [ ] Backup MongoDB data

---

## Success Criteria 🎯

Your app is production-ready when:

1. ✅ **Fast**: Notifications < 1 second
2. ✅ **Reliable**: Works 99% of the time
3. ✅ **Cross-device**: PC, phone, tablet all work
4. ✅ **No refresh**: Real-time updates work
5. ✅ **Video works**: Jitsi meetings connect
6. ✅ **Beautiful**: UI looks professional
7. ✅ **Tested**: Works with real users

---

## Next Steps After Launch 🚀

Once everything works:

- [ ] Collect feedback from users
- [ ] Monitor usage (check MongoDB)
- [ ] Consider adding features:
  - [ ] Email notifications
  - [ ] User authentication
  - [ ] Calendar integration
  - [ ] Meeting reminders
- [ ] Upgrade to paid plans if needed:
  - [ ] Render: $7/month (no sleep)
  - [ ] MongoDB Atlas: $9/month (more storage)

---

## Quick Reference Commands 📝

```bash
# Start frontend
cd frontend && npm start

# Deploy to Vercel
cd frontend && vercel

# Check dependencies
cd frontend && npm list

# Build for production
cd frontend && npm run build

# Test with ngrok
ngrok http 3000

# Check backend
curl https://your-backend.onrender.com

# View logs
# Go to Render dashboard → Logs
```

---

## Documentation Reference 📚

- `START_HERE.md` - Quick start guide
- `QUICKSTART.md` - Fast setup
- `TESTING_GUIDE.md` - Detailed testing
- `DEPLOYMENT_GUIDE.md` - Deployment steps
- `PROJECT_OVERVIEW.md` - Technical details
- `README.md` - Full documentation

---

**Print this checklist and check off items as you go!** ✅

Once all items are checked, you're ready to share your app with the world! 🌍
