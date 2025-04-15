
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
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

// Import context providers
import { AuthProvider } from './context/AuthContext';

// Import the PrivateRoute component
import PrivateRoute from './components/common/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <div className="main-content">
            <Sidebar />
            <main className="content-area">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                <Route path="/dashboard" element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                } />
                
                <Route path="/profile" element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                } />
                
                <Route path="/activities" element={
                  <PrivateRoute>
                    <ActivityPage />
                  </PrivateRoute>
                } />
                
                <Route path="/projects" element={
                  <PrivateRoute>
                    <ProjectPage />
                  </PrivateRoute>
                } />
                
                <Route path="/courses" element={
                  <PrivateRoute>
                    <CoursePage />
                  </PrivateRoute>
                } />
                
                <Route path="/courses/:id" element={
                  <PrivateRoute>
                    <CoursePage />
                  </PrivateRoute>
                } />
                
                <Route path="/calendar" element={
                  <PrivateRoute>
                    <CalendarPage />
                  </PrivateRoute>
                } />
                
                <Route path="/api-explorer" element={
                  <PrivateRoute>
                    <APIExplorer />
                  </PrivateRoute>
                } />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

