
// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';

// Import all page components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import ActivityPage from './pages/ActivityPage';
import ProjectPage from './pages/ProjectPage';
import CoursePage from './pages/CoursePage';
import CalendarPage from './pages/CalendarPage';
import APIExplorer from './components/common/ApiExplorer';


// Import common components
import PrivateRoute from './components/common/PrivateRoute';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

// Import context providers
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Header />
          <div className="main-container">
            <Sidebar />
            <main className="content">
              <Routes>
                <Route exact path="/" element={<HomePage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegisterPage/>} />
                <PrivateRoute path="/dashboard" element={<DashboardPage/>} />
                <PrivateRoute path="/profile" element={<ProfilePage/>} />
                <PrivateRoute path="/activities" element={<ActivityPage/>} />
                <PrivateRoute path="/projects" element={<ProjectPage/>} />
                <PrivateRoute path="/courses" element={<CoursePage/>} />
                <PrivateRoute path="/calendar" element={<CalendarPage/>} />
                <PrivateRoute path="/api-explorer" element={<APIExplorer/>} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

