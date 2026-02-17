import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

// Backend API URL - Hardcoded for deployment
const API_URL = 'https://meeting-scheduler-app-1.onrender.com';
const socket = io(API_URL);

function StudentDashboard({ userData, goHome }) {
  const [meetings, setMeetings] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Fetch existing meetings
    fetchMeetings();

    // Join socket with user data
    socket.emit('join', { id: userData.email, role: 'student', email: userData.email });

    // Listen for new meeting requests in real-time
    socket.on('new_request', (data) => {
      if (data.student_email === userData.email) {
        setMeetings(prev => [data, ...prev]);
        
        // Show notification
        setNotification({
          title: 'New Meeting Request!',
          message: `${data.recruiter_name} wants to schedule a meeting`
        });
        
        // Play sound notification
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZZBII');
        audio.play().catch(e => console.log('Audio play failed:', e));
        
        // Hide notification after 5 seconds
        setTimeout(() => setNotification(null), 5000);
      }
    });

    return () => {
      socket.off('new_request');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.email]);

  const fetchMeetings = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/meetings/student/${userData.email}`);
      setMeetings(response.data.meetings);
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  };

  const handleAccept = async (meetingId) => {
    try {
      const response = await axios.put(`${API_URL}/api/meetings/${meetingId}/accept`);
      if (response.data.success) {
        setMeetings(prev => 
          prev.map(m => 
            m._id === meetingId ? { ...m, status: 'accepted' } : m
          )
        );
        alert('Meeting accepted! You can now join the meeting.');
      }
    } catch (error) {
      alert('Error accepting meeting');
      console.error(error);
    }
  };

  const handleDecline = async (meetingId) => {
    try {
      const response = await axios.put(`${API_URL}/api/meetings/${meetingId}/decline`);
      if (response.data.success) {
        setMeetings(prev => 
          prev.map(m => 
            m._id === meetingId ? { ...m, status: 'declined' } : m
          )
        );
        alert('Meeting declined.');
      }
    } catch (error) {
      alert('Error declining meeting');
      console.error(error);
    }
  };

  return (
    <div className="dashboard">
      {notification && (
        <div className="notification">
          <h3>{notification.title}</h3>
          <p>{notification.message}</p>
        </div>
      )}

      <div className="dashboard-header">
        <div className="user-info">
          <h1>Welcome, Student!</h1>
          <p>{userData.email}</p>
        </div>
        <button className="home-btn" onClick={goHome}>Logout</button>
      </div>

      <div className="meetings-section">
        <h2>📬 Your Meeting Requests</h2>
        {meetings.length === 0 ? (
          <div className="empty-state">No meeting requests yet</div>
        ) : (
          meetings.map(meeting => (
            <div key={meeting._id} className="meeting-card">
              <h3>Meeting with {meeting.recruiter_name}</h3>
              <p className="meeting-info">📅 Date: {meeting.date}</p>
              <p className="meeting-info">⏰ Time: {meeting.time}</p>
              <span className={`status-badge status-${meeting.status}`}>
                {meeting.status.toUpperCase()}
              </span>
              
              {meeting.status === 'pending' && (
                <div className="meeting-actions">
                  <button 
                    className="accept-btn" 
                    onClick={() => handleAccept(meeting._id)}
                  >
                    ✓ Accept
                  </button>
                  <button 
                    className="decline-btn" 
                    onClick={() => handleDecline(meeting._id)}
                  >
                    ✗ Decline
                  </button>
                </div>
              )}
              
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

export default StudentDashboard;
