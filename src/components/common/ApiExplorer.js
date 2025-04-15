// frontend/src/components/common/ApiExplorer.js

// frontend/src/components/common/ApiExplorer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Collapse, 
  Button, 
  CircularProgress, 
  Box 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const ApiExplorer = () => {
  const [endpoints, setEndpoints] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    const fetchEndpoints = async () => {
      try {
        setLoading(true);
        
        // Main Django endpoints
        const mainEndpoints = {
          admin: '/admin/',
          auth: '/api/auth/',
          tracking: '/api/tracking/',
          projects: '/api/projects/',
          courses: '/api/courses/',
          calendar: '/api/calendar/',
          tokenAuth: '/api/token-auth/'
        };
        
        // Try to fetch nested endpoints
        let trackingEndpoints = {};
        let projectsEndpoints = {};
        let coursesEndpoints = {};
        let calendarEndpoints = {};
        let authEndpoints = {};
        
        try {
          const trackingResponse = await axios.get('/api/tracking/');
          trackingEndpoints = trackingResponse.data;
        } catch (e) {
          console.warn('Could not fetch tracking endpoints');
        }
        
        try {
          const projectsResponse = await axios.get('/api/projects/');
          projectsEndpoints = projectsResponse.data;
        } catch (e) {
          console.warn('Could not fetch projects endpoints');
        }
        
        try {
          const coursesResponse = await axios.get('/api/courses/');
          coursesEndpoints = coursesResponse.data;
        } catch (e) {
          console.warn('Could not fetch courses endpoints');
        }
        
        try {
          const calendarResponse = await axios.get('/api/calendar/');
          calendarEndpoints = calendarResponse.data;
        } catch (e) {
          console.warn('Could not fetch calendar endpoints');
        }
        
        try {
          const authResponse = await axios.get('/api/auth/');
          authEndpoints = authResponse.data;
        } catch (e) {
          console.warn('Could not fetch auth endpoints');
        }
        
        setEndpoints({
          main: mainEndpoints,
          tracking: trackingEndpoints,
          projects: projectsEndpoints,
          courses: coursesEndpoints,
          calendar: calendarEndpoints,
          auth: authEndpoints
        });
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load API endpoints');
        setLoading(false);
        console.error('Error fetching API endpoints:', err);
      }
    };
    
    fetchEndpoints();
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error" variant="h6">{error}</Typography>
      </Box>
    );
  }

  const renderEndpointSection = (title, endpoints) => {
    if (!endpoints || Object.keys(endpoints).length === 0) return null;
    
    const isExpanded = expandedSections[title] || false;
    
    return (
      <Card sx={{ mb: 2 }}>
        <CardHeader
          title={title}
          action={
            <Button onClick={() => toggleSection(title)}>
              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>
          }
        />
        <Collapse in={isExpanded}>
          <CardContent>
            <List>
              {Object.entries(endpoints).map(([name, url]) => (
                <ListItem key={name} divider>
                  <ListItemText 
                    primary={name} 
                    secondary={url} 
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Collapse>
      </Card>
    );
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        API Explorer
      </Typography>
      <Typography variant="body1" paragraph>
        Explore the available API endpoints for this application.
      </Typography>
      
      {renderEndpointSection('Main Endpoints', endpoints.main)}
      {renderEndpointSection('Tracking Endpoints', endpoints.tracking)}
      {renderEndpointSection('Project Endpoints', endpoints.projects)}
      {renderEndpointSection('Course Endpoints', endpoints.courses)}
      {renderEndpointSection('Calendar Endpoints', endpoints.calendar)}
      {renderEndpointSection('Auth Endpoints', endpoints.auth)}
    </Box>
  );
};

export default ApiExplorer;

