
// frontend/src/components/common/ApiExplorer.js
import React, { useState, useEffect } from 'react';
import { getApiRoot } from '../../services/api';
import { Card, CardHeader, CardContent, Typography, List, ListItem, 
         ListItemText, Collapse, Button, CircularProgress, Box } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';

const ApiExplorer = () => {
  const [endpoints, setEndpoints] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    const fetchEndpoints = async () => {
      try {
        setLoading(true);
        const response = await getApiRoot();
        setEndpoints(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load API endpoints');
        setLoading(false);
        console.error('Error fetching API endpoints:', err);
      }
    };

    fetchEndpoints();
  }, []);

  const handleToggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderEndpoint = (key, url) => {
    // If url is a string, render a simple endpoint
    if (typeof url === 'string') {
      return (
        <ListItem key={key} dense>
          <ListItemText 
            primary={<Typography variant="body2" component="span">{key}</Typography>}
            secondary={<Typography variant="caption" color="textSecondary">{url}</Typography>}
          />
        </ListItem>
      );
    }
    
    // If url is an object, render a collapsible section with nested endpoints
    return (
      <React.Fragment key={key}>
        <ListItem button onClick={() => handleToggleSection(key)}>
          <ListItemText primary={key} />
          {expandedSections[key] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={expandedSections[key] || false} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {Object.entries(url).map(([subKey, subUrl]) => (
              <ListItem key={subKey} dense style={{ paddingLeft: 32 }}>
                <ListItemText 
                  primary={<Typography variant="body2" component="span">{subKey}</Typography>}
                  secondary={<Typography variant="caption" color="textSecondary">{subUrl}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    );
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" padding={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Card variant="outlined">
        <CardContent>
          <Typography color="error">{error}</Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => window.location.reload()}
            style={{ marginTop: 16 }}
          >
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="outlined">
      <CardHeader title="API Endpoints" />
      <CardContent>
        <List>
          {Object.entries(endpoints).map(([key, url]) => renderEndpoint(key, url))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ApiExplorer;
