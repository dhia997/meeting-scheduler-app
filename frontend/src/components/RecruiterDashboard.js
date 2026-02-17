import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

// Backend API URL - Hardcoded for deployment
const API_URL = 'https://meeting-scheduler-app-1.onrender.com';
const socket = io(API_URL);

function RecruiterDashboard({ userData, goHome }) {
  const [meetings, setMeetings] = useState([]);
  const [formData, setFormData] = useState({
    student_email: '',
    date: '',
    time: ''
  });

  useEffect(() => {
    // Fetch existing meetings
    fetchMeetings();

    // Listen for real-time updates when student responds
    socket.on('request_responded', (data) => {
      setMeetings(prev => 
        prev.map(m => 
          m._id === data.id ? { ...m, status: data.status } : m
        )
      );
      
      // Show notification
      if (data.status === 'accepted') {
        alert(`Student accepted your meeting request!`);
      }
    });

    return () => {
      socket.off('request_responded');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMeetings = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/meetings/recruiter/${userData.name}`);
      setMeetings(response.data.meetings);
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/meetings/request`, {
        recruiter_name: userData.name,
        student_email: formData.student_email,
        date: formData.date,
        time: formData.time
      });

      if (response.data.success) {
        alert('Meeting request sent successfully!');
        setMeetings([response.data.meeting, ...meetings]);
        setFormData({ student_email: '', date: '', time: '' });
      }
    } catch (error) {
      alert('Error sending meeting request');
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="user-info">
          <h1>Welcome, {userData.name}!</h1>
          <p>Recruiter Dashboard</p>
        </div>
        <button className="home-btn" onClick={goHome}>Logout</button>
      </div>

      <div className="meeting-form">
        <h2>📅 Schedule a Meeting</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Student Email</label>
            <input
              type="email"
              name="student_email"
              value={formData.student_email}
              onChange={handleChange}
              placeholder="student@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Meeting Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Meeting Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Send Meeting Request</button>
        </form>
      </div>

      <div className="meetings-section">
        <h2>📋 Your Meeting Requests</h2>
        {meetings.length === 0 ? (
          <div className="empty-state">No meeting requests yet</div>
        ) : (
          meetings.map(meeting => (
            <div key={meeting._id} className="meeting-card">
              <h3>Meeting with {meeting.student_email}</h3>
              <p className="meeting-info">📅 Date: {meeting.date}</p>
              <p className="meeting-info">⏰ Time: {meeting.time}</p>
              <span className={`status-badge status-${meeting.status}`}>
                {meeting.status.toUpperCase()}
              </span>
              {meeting.status === 'accepted' && (
                <div className="meeting-actions">
                  <a href={meeting.meeting_link} target="_blank" rel="noopener noreferrer">
                    <button className="join-btn">🎥 Join Meeting</button>
                  </a>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecruiterDashboard;
