
// frontend/src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Activity Tracking System</h1>
        <p>Track your activities, projects, courses and events all in one place</p>
        <div className="cta-buttons">
          <Link to="/register" className="btn btn-primary">Get Started</Link>
          <Link to="/login" className="btn btn-secondary">Login</Link>
        </div>
      </div>

      <div className="features-section">
        <h2>Available Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-tasks"></i>
            <h3>Activity Tracking</h3>
            <p>Monitor progress on your activities with detailed checkpoints</p>
            <Link to="/activities">Explore Activities</Link>
          </div>
          
          <div className="feature-card">
            <i className="fas fa-project-diagram"></i>
            <h3>Project Management</h3>
            <p>Organize and track your projects with tasks and deadlines</p>
            <Link to="/projects">Manage Projects</Link>
          </div>
          
          <div className="feature-card">
            <i className="fas fa-graduation-cap"></i>
            <h3>Course Progress</h3>
            <p>Track your learning progress across different courses</p>
            <Link to="/courses">View Courses</Link>
          </div>
          
          <div className="feature-card">
            <i className="fas fa-calendar-alt"></i>
            <h3>Calendar Events</h3>
            <p>Schedule and manage your events in a calendar view</p>
            <Link to="/calendar">Open Calendar</Link>
          </div>
        </div>
      </div>

      <div className="api-endpoints-section">
        <h2>Available API Endpoints</h2>
        <p>Explore all the API endpoints available in the system</p>
        <Link to="/api-explorer" className="btn btn-info">Open API Explorer</Link>
        
        <div className="endpoints-list">
          <div className="endpoint-group">
            <h3>Main Endpoints</h3>
            <ul>
              <li><a href="/admin/" target="_blank" rel="noopener noreferrer">Admin Dashboard</a></li>
              <li><a href="/api/auth/" target="_blank" rel="noopener noreferrer">Authentication API</a></li>
              <li><a href="/api/tracking/" target="_blank" rel="noopener noreferrer">Tracking API</a></li>
              <li><a href="/api/projects/" target="_blank" rel="noopener noreferrer">Projects API</a></li>
              <li><a href="/api/courses/" target="_blank" rel="noopener noreferrer">Courses API</a></li>
              <li><a href="/api/calendar/" target="_blank" rel="noopener noreferrer">Calendar API</a></li>
              <li><a href="/api/token-auth/" target="_blank" rel="noopener noreferrer">Token Authentication</a></li>
            </ul>
          </div>
          
          <div className="endpoint-group">
            <h3>Tracking Endpoints</h3>
            <ul>
              <li><a href="/api/tracking/categories/" target="_blank" rel="noopener noreferrer">Categories</a></li>
              <li><a href="/api/tracking/activities/" target="_blank" rel="noopener noreferrer">Activities</a></li>
              <li><a href="/api/tracking/checkpoints/" target="_blank" rel="noopener noreferrer">Checkpoints</a></li>
              <li><a href="/api/tracking/resources/" target="_blank" rel="noopener noreferrer">Resources</a></li>
            </ul>
          </div>
          
          <div className="endpoint-group">
            <h3>Project Endpoints</h3>
            <ul>
              <li><a href="/api/projects/projects/" target="_blank" rel="noopener noreferrer">Projects</a></li>
              <li><a href="/api/projects/tasks/" target="_blank" rel="noopener noreferrer">Tasks</a></li>
            </ul>
          </div>
          
          <div className="endpoint-group">
            <h3>Course Endpoints</h3>
            <ul>
              <li><a href="/api/courses/categories/" target="_blank" rel="noopener noreferrer">Course Categories</a></li>
              <li><a href="/api/courses/courses/" target="_blank" rel="noopener noreferrer">Courses</a></li>
            </ul>
          </div>
          
          <div className="endpoint-group">
            <h3>Calendar Endpoints</h3>
            <ul>
              <li><a href="/api/calendar/events/" target="_blank" rel="noopener noreferrer">Events</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
