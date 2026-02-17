# Real-Time Meeting Scheduler 🎥

A real-time meeting scheduling application that connects recruiters and students with instant notifications and video conferencing capabilities.

## Features ✨

- **Two User Roles**: Recruiter and Student interfaces
- **Real-Time Notifications**: Instant updates using Socket.io
- **Meeting Scheduling**: Recruiters can schedule meetings with students
- **Accept/Decline**: Students can respond to meeting requests
- **Video Conferencing**: Integrated with Jitsi Meet for video calls
- **Cross-Device**: Works on PC, phone, tablet - any device!
- **MongoDB Atlas**: Cloud database for persistent storage

## Tech Stack 🛠️

### Backend
- Node.js + Express
- Socket.io (Real-time communication)
- MongoDB Atlas (Database)
- Deployed on Render

### Frontend
- React.js
- Socket.io-client
- Axios
- Modern CSS with gradients

## Setup Instructions 🚀

### Backend Setup (Already deployed on Render)

1. Make sure your backend is running on Render
2. Note your Render backend URL (e.g., `https://your-app.onrender.com`)

### Frontend Setup

1. **Navigate to frontend folder**:
   ```bash
   cd frontend
   ```

2. **Install dependencies** (already done):
   ```bash
   npm install
   ```

3. **Configure Backend URL**:
   - Open `frontend/.env`
   - Replace `http://localhost:5001` with your Render backend URL:
     ```
     REACT_APP_API_URL=https://your-backend-name.onrender.com
     ```

4. **Start the frontend**:
   ```bash
   npm start
   ```

5. The app will open at `http://localhost:3000`

## How It Works 🎯

### For Recruiters:
1. Open the app and select "Recruiter"
2. Enter your name
3. Create a meeting request:
   - Enter student email
   - Choose date and time
4. Click "Send Meeting Request"
5. **Real-time**: When student accepts, you'll get an instant notification!
6. Join the meeting using the generated Jitsi link

### For Students:
1. Open the app and select "Student"
2. Enter your email
3. **Real-time**: Receive instant notifications when recruiters send meeting requests
4. Accept or decline the meeting
5. If accepted, join the meeting using the Jitsi link

## Sharing the App 📱

### To share with your friend:

1. **If testing locally**:
   - Use ngrok or localtunnel to expose your local frontend
   - Example with ngrok:
     ```bash
     ngrok http 3000
     ```
   - Share the ngrok URL with your friend

2. **For production** (recommended):
   - Deploy frontend to:
     - Vercel (easiest)
     - Netlify
     - Render
     - GitHub Pages
   - Share the deployed URL

### Example: Deploy to Vercel
```bash
cd frontend
npm install -g vercel
vercel
```

## Real-Time Features 🔔

- **Instant Notifications**: When a recruiter sends a request, the student gets notified immediately
- **Status Updates**: Both users see real-time status changes (pending → accepted/declined)
- **Cross-Device**: Works PC-to-Phone, Phone-to-Phone, PC-to-PC
- **No Refresh Needed**: Everything updates automatically via WebSockets

## Environment Variables 🔐

### Backend (.env)
```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5001
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-name.onrender.com
```

## Testing the App 🧪

1. **Open two browser windows**:
   - Window 1: Select "Recruiter" → Enter name "John"
   - Window 2: Select "Student" → Enter email "student@test.com"

2. **In Recruiter window**:
   - Create meeting request for "student@test.com"
   - Send request

3. **In Student window**:
   - You'll see instant notification! 🔔
   - Accept the meeting

4. **Both windows**:
   - Both can now join the meeting via the Jitsi link

## Deployment 🌐

### Backend (Render)
✅ Already deployed!

### Frontend Options:

#### Option 1: Vercel (Recommended)
```bash
cd frontend
vercel
```

#### Option 2: Netlify
```bash
cd frontend
npm run build
# Drag and drop the 'build' folder to Netlify
```

#### Option 3: Render
1. Push frontend code to GitHub
2. Create new "Static Site" on Render
3. Build command: `npm run build`
4. Publish directory: `build`

## Troubleshooting 🔧

### "Cannot connect to backend"
- Check that your backend URL in `.env` is correct
- Make sure backend is running on Render
- Check browser console for errors

### "No notifications appearing"
- Open browser console and check for Socket.io connection
- Make sure backend URL includes protocol (`https://`)
- Try refreshing the page

### "Meeting link not working"
- Jitsi links work without any setup
- Just click and allow camera/mic permissions

## Project Structure 📁

```
meeting-test-2/
├── backend/
│   ├── server.js          # Express + Socket.io server
│   ├── package.json
│   └── .env              # MongoDB URI
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Home.js              # Role selection page
    │   │   ├── RecruiterDashboard.js # Recruiter interface
    │   │   └── StudentDashboard.js   # Student interface
    │   ├── App.js                    # Main app component
    │   ├── App.css                   # Styles
    │   └── index.js
    ├── package.json
    └── .env              # Backend API URL

```

## Features Implemented ✅

- ✅ Real-time notifications using Socket.io
- ✅ Two separate interfaces (Recruiter & Student)
- ✅ Meeting request creation
- ✅ Accept/Decline functionality
- ✅ Video conferencing with Jitsi
- ✅ MongoDB Atlas integration
- ✅ Cross-device compatibility
- ✅ Beautiful, modern UI
- ✅ Responsive design (mobile-friendly)

## Next Steps 🎯

To use with your friend:

1. **Update `.env` file** with your Render backend URL
2. **Start the frontend**: `npm start`
3. **Share the app**:
   - Deploy to Vercel/Netlify for permanent access
   - Or use ngrok for quick testing
4. **Send the link** to your friend
5. **Test it**: You create a meeting, they receive notification instantly!

## Support 💬

If you encounter any issues:
1. Check browser console for errors
2. Verify backend is running on Render
3. Ensure `.env` has correct backend URL
4. Check that MongoDB Atlas is connected

---

Made with ❤️ for real-time collaboration
# Force redeploy
