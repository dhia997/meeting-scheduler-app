# Testing Guide 🧪

## Pre-Test Checklist ✅

Before testing, make sure:

1. ✅ Backend is running on Render
2. ✅ `frontend/.env` has your Render URL
3. ✅ MongoDB Atlas is connected
4. ✅ Frontend dependencies installed (`npm install` in frontend/)

---

## Test 1: Basic Connection Test (2 minutes)

**Goal**: Verify frontend can connect to backend

### Steps:

1. **Start frontend**:
   ```bash
   cd frontend
   npm start
   ```

2. **Open browser DevTools**:
   - Press `F12` or right-click → Inspect
   - Go to "Console" tab

3. **Look for**:
   - ✅ No red errors
   - ✅ Should see Socket.io connection messages
   - ❌ If you see "Connection refused" → Check .env file

### Expected Result:
```
Socket connected successfully
```

---

## Test 2: Recruiter Interface (3 minutes)

**Goal**: Test creating a meeting request

### Steps:

1. **Open app**: `http://localhost:3000`
2. **Click "Recruiter"**
3. **Enter name**: "Test Recruiter"
4. **Create meeting**:
   - Student email: `student@test.com`
   - Date: Tomorrow
   - Time: `14:00`
5. **Click "Send Meeting Request"**

### Expected Result:
- ✅ Alert: "Meeting request sent successfully!"
- ✅ Meeting appears in "Your Meeting Requests" section
- ✅ Status badge shows "PENDING"

### Verify in Backend:
- Check Render logs (should see meeting created)
- Or check MongoDB Atlas → Collections → meetings

---

## Test 3: Student Interface (3 minutes)

**Goal**: Test receiving meeting requests

### Steps:

1. **Open NEW browser window** (keep recruiter window open)
2. **Go to**: `http://localhost:3000`
3. **Click "Student"**
4. **Enter email**: `student@test.com` (SAME as recruiter form)

### Expected Result:
- ✅ Meeting request appears in list
- ✅ Shows recruiter name, date, time
- ✅ Status: "PENDING"
- ✅ Two buttons: "Accept" and "Decline"

---

## Test 4: Real-Time Notifications (5 minutes) ⭐

**Goal**: Test WebSocket real-time updates

### Setup:
- Window 1 (Left): Recruiter interface (Alice)
- Window 2 (Right): Student interface (student@test.com)

### Test 4A: Instant Notification on New Meeting

1. **Window 1 (Recruiter)**:
   - Create NEW meeting for `student@test.com`
   - Click "Send Meeting Request"

2. **Window 2 (Student)**:
   - **Watch carefully!** 👀
   - **Expected**: Notification pops up in top-right corner!
   - **Expected**: New meeting card appears WITHOUT refreshing!

### Result:
- ✅ Notification appears instantly (within 1 second)
- ✅ Meeting card appears without F5/refresh
- ✅ You hear notification sound (if browser allows)

### Test 4B: Real-Time Status Update

1. **Window 2 (Student)**:
   - Click "Accept" on a pending meeting

2. **Window 1 (Recruiter)**:
   - **Watch your meeting list!** 👀
   - **Expected**: Status changes from PENDING → ACCEPTED instantly!
   - **Expected**: Browser alert: "Student accepted your meeting request!"

### Result:
- ✅ Status updates WITHOUT refresh
- ✅ "Join Meeting" button appears
- ✅ Alert notification pops up

---

## Test 5: Accept/Decline Flow (3 minutes)

### Test 5A: Accept Meeting

1. **Student window**: Click "Accept"
2. **Expected**:
   - ✅ Alert: "Meeting accepted!"
   - ✅ Status changes to "ACCEPTED"
   - ✅ "Join Meeting" button appears
   - ✅ "Accept/Decline" buttons disappear

3. **Recruiter window**: Should auto-update to show "ACCEPTED"

### Test 5B: Decline Meeting

1. **Create another meeting** (recruiter)
2. **Student window**: Click "Decline"
3. **Expected**:
   - ✅ Alert: "Meeting declined."
   - ✅ Status changes to "DECLINED"
   - ✅ No action buttons

---

## Test 6: Video Meeting (2 minutes)

**Goal**: Test joining video call

### Steps:

1. **Accept a meeting** (if not already accepted)
2. **Both windows**: Click "Join Meeting" button
3. **New tab opens**: Jitsi Meet
4. **Allow camera/microphone** when prompted

### Expected Result:
- ✅ Jitsi meeting opens
- ✅ You can see yourself (if camera enabled)
- ✅ Both "users" in same meeting room
- ✅ Can interact via video/audio

---

## Test 7: Cross-Device Test (10 minutes) 📱

**Goal**: Test real scenario (PC to Phone)

### Setup:

1. **Install ngrok**:
   ```bash
   sudo snap install ngrok
   ```

2. **Start ngrok** (new terminal):
   ```bash
   ngrok http 3000
   ```

3. **Copy the HTTPS URL**: `https://abc123.ngrok-free.app`

### Test Flow:

1. **Your PC**:
   - Open ngrok URL
   - Select "Recruiter"
   - Name: "Your Name"

2. **Friend's Phone**:
   - Send ngrok URL via WhatsApp
   - Friend opens on phone
   - Select "Student"
   - Email: `friend@email.com`

3. **Your PC**:
   - Create meeting for `friend@email.com`
   - Pick date/time
   - Send request

4. **Friend's Phone**:
   - **Should see notification pop up!** 🔔
   - Accept meeting

5. **Your PC**:
   - **Should see alert: "Student accepted!"** 🎉

6. **Both**:
   - Click "Join Meeting"
   - Video call starts!

### Expected Result:
- ✅ Real-time notification across devices
- ✅ PC ↔ Phone communication works
- ✅ Video meeting works on mobile

---

## Test 8: Multiple Users (5 minutes)

**Goal**: Test multiple students

### Steps:

1. **Open 3 browser windows**:
   - Window 1: Recruiter
   - Window 2: Student A (student1@test.com)
   - Window 3: Student B (student2@test.com)

2. **Recruiter sends two meetings**:
   - Meeting 1 → student1@test.com
   - Meeting 2 → student2@test.com

3. **Verify**:
   - Window 2 sees only their meeting
   - Window 3 sees only their meeting
   - Recruiter sees both meetings

### Expected Result:
- ✅ Each student sees only their own requests
- ✅ Recruiter sees all sent requests
- ✅ No cross-contamination of data

---

## Common Issues & Fixes 🔧

### Issue 1: "Cannot connect to backend"

**Symptoms**:
- No meetings appear
- Console shows connection errors

**Fix**:
```bash
# Check .env file
cat frontend/.env

# Should show your Render URL, NOT localhost
# If wrong, edit and restart frontend
```

### Issue 2: "Notification not appearing"

**Symptoms**:
- Meeting created but student doesn't see it

**Fix**:
- Check console for WebSocket errors
- Verify email matches EXACTLY (case-sensitive)
- Try refreshing student window
- Check backend logs on Render

### Issue 3: "Real-time not working"

**Symptoms**:
- Need to refresh to see updates

**Fix**:
- Check CORS settings in backend
- Verify Socket.io connection (console)
- Make sure using same backend URL everywhere
- Check Render backend is awake (free tier sleeps)

### Issue 4: "Join Meeting link not working"

**Symptoms**:
- Jitsi link doesn't open

**Fix**:
- Jitsi links work without config
- Check popup blocker settings
- Try clicking link again
- Open in new tab manually

---

## Performance Tests ⚡

### Test 9: Connection Speed

**Goal**: Measure notification speed

1. **Setup**: Two browser windows side by side
2. **Start timer** when clicking "Send Request"
3. **Stop timer** when notification appears
4. **Expected**: < 1 second (usually 100-300ms)

### Test 10: Load Test

**Goal**: Test with multiple meetings

1. **Create 10 meetings** (recruiter)
2. **Check performance**:
   - Page loads quickly
   - No lag when scrolling
   - All meetings display correctly

---

## Automated Testing Checklist ✅

Run through these scenarios:

- [ ] Frontend connects to backend
- [ ] Recruiter can create meeting
- [ ] Student receives meeting request
- [ ] Real-time notification appears
- [ ] Student can accept meeting
- [ ] Status updates in real-time
- [ ] Student can decline meeting
- [ ] Join meeting link works
- [ ] Multiple students work independently
- [ ] Cross-device works (PC ↔ Phone)
- [ ] Page refresh keeps data
- [ ] No console errors
- [ ] Mobile responsive design works

---

## Success Criteria 🎯

Your app is working if:

1. ✅ **Real-time works**: Notification < 1 second
2. ✅ **Cross-device works**: PC can notify phone
3. ✅ **No refresh needed**: Updates appear automatically
4. ✅ **Video works**: Jitsi meeting launches
5. ✅ **Data persists**: Refresh keeps meetings
6. ✅ **No errors**: Console is clean

---

## Testing Checklist for Deployment 📦

Before sharing with others:

- [ ] Update `frontend/.env` with Render URL
- [ ] Test with ngrok first
- [ ] Verify notifications work cross-device
- [ ] Test on mobile browser
- [ ] Check backend logs on Render
- [ ] Verify MongoDB connections
- [ ] Test video calling
- [ ] Check responsive design

---

## Next: Deploy for Real Users 🚀

Once all tests pass:

1. Deploy frontend to Vercel
2. Update any URLs if needed
3. Test deployed version
4. Share with friends!

See `DEPLOYMENT_GUIDE.md` for details.

---

**Questions?** Check the console (F12) first, it shows most issues!
