import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import RecruiterDashboard from './components/RecruiterDashboard';
import StudentDashboard from './components/StudentDashboard';

function App() {
  const [currentView, setCurrentView] = useState('home'); // home, recruiter, student
  const [userData, setUserData] = useState(null);

  const handleRoleSelect = (role, data) => {
    setUserData(data);
    setCurrentView(role);
  };

  const goHome = () => {
    setCurrentView('home');
    setUserData(null);
  };

  return (
    <div className="App">
      {currentView === 'home' && <Home onRoleSelect={handleRoleSelect} />}
      {currentView === 'recruiter' && <RecruiterDashboard userData={userData} goHome={goHome} />}
      {currentView === 'student' && <StudentDashboard userData={userData} goHome={goHome} />}
    </div>
  );
}

export default App;
