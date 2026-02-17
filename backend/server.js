require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected!'))
  .catch(err => console.log('❌ MongoDB error:', err));

// Meeting Request Schema
const meetingSchema = new mongoose.Schema({
  recruiter_name: String,
  recruiter_id: String,
  student_email: String,
  student_id: { type: String, default: null },
  date: String,
  time: String,
  meeting_link: String,
  status: { type: String, default: 'pending' }, // pending, accepted, declined
  created_at: { type: Date, default: Date.now }
});

const Meeting = mongoose.model('Meeting', meetingSchema);

// Store active users
const activeUsers = {};

// ===== WEBSOCKET =====
io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  // User joins with their identifier
  socket.on('join', (userData) => {
    activeUsers[userData.id] = { socketId: socket.id, ...userData };
    io.emit('users_updated', Object.values(activeUsers));
  });

  // Listen for meeting request from recruiter
  socket.on('send_request', (data) => {
    io.emit('new_request', data);
  });

  // Listen for response from student
  socket.on('respond_request', (data) => {
    io.emit('request_responded', data);
  });

  socket.on('disconnect', () => {
    Object.keys(activeUsers).forEach(key => {
      if (activeUsers[key].socketId === socket.id) delete activeUsers[key];
    });
    io.emit('users_updated', Object.values(activeUsers));
    console.log('❌ User disconnected:', socket.id);
  });
});

// ===== ROUTES =====

app.get('/', (req, res) => {
  res.json({ message: '🚀 API Running! WebSocket ready.' });
});

// GET all meetings for a student
app.get('/api/meetings/student/:email', async (req, res) => {
  try {
    const meetings = await Meeting.find({ student_email: req.params.email }).sort({ created_at: -1 });
    res.json({ success: true, meetings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all meetings sent by a recruiter
app.get('/api/meetings/recruiter/:name', async (req, res) => {
  try {
    const meetings = await Meeting.find({ recruiter_name: req.params.name }).sort({ created_at: -1 });
    res.json({ success: true, meetings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create meeting request (recruiter sends to student)
app.post('/api/meetings/request', async (req, res) => {
  try {
    const { recruiter_name, student_email, date, time } = req.body;
    const meeting_link = `https://meet.jit.si/Meeting-${Date.now()}`;
    
    const meeting = new Meeting({
      recruiter_name,
      recruiter_id: recruiter_name.toLowerCase(),
      student_email,
      date,
      time,
      meeting_link
    });
    await meeting.save();
    
    io.emit('new_request', meeting);
    res.status(201).json({ success: true, meeting });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT accept meeting
app.put('/api/meetings/:id/accept', async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      { status: 'accepted' },
      { new: true }
    );
    io.emit('request_responded', { id: meeting._id, status: 'accepted' });
    res.json({ success: true, meeting });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT decline meeting
app.put('/api/meetings/:id/decline', async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      { status: 'declined' },
      { new: true }
    );
    io.emit('request_responded', { id: meeting._id, status: 'declined' });
    res.json({ success: true, meeting });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE meeting
app.delete('/api/meetings/:id', async (req, res) => {
  try {
    await Meeting.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT} with WebSocket`);
});