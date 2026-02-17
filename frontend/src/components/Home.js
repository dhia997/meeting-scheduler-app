import React, { useState } from 'react';

function Home({ onRoleSelect }) {
  const [recruiterName, setRecruiterName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');

  const handleRecruiterSubmit = (e) => {
    e.preventDefault();
    if (recruiterName.trim()) {
      onRoleSelect('recruiter', { name: recruiterName });
    }
  };

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    if (studentEmail.trim()) {
      onRoleSelect('student', { email: studentEmail });
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Meeting Scheduler</h1>
      <p className="home-subtitle">Connect Recruiters and Students in Real-Time</p>
      
      <div className="role-selection">
        <div className="role-card">
          <div className="role-icon">👨‍💼</div>
          <h2>Recruiter</h2>
          <p>Schedule meetings with students</p>
          <form onSubmit={handleRecruiterSubmit}>
            <input
              type="text"
              placeholder="Enter your name"
              value={recruiterName}
              onChange={(e) => setRecruiterName(e.target.value)}
              required
            />
            <button type="submit">Continue as Recruiter</button>
          </form>
        </div>

        <div className="role-card">
          <div className="role-icon">👨‍🎓</div>
          <h2>Student</h2>
          <p>Receive and manage meeting requests</p>
          <form onSubmit={handleStudentSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              required
            />
            <button type="submit">Continue as Student</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
