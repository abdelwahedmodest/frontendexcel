
// frontend/src/components/courses/CourseDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const [course, setCourse] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        
        // Get token from local storage
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Token ${token}` }
        };
        
        // Fetch course data
        const courseResponse = await axios.get(`/api/courses/courses/${id}/`, config);
        setCourse(courseResponse.data);
        
        // Fetch category data if the course has a category
        if (courseResponse.data.category) {
          const categoryResponse = await axios.get(
            `/api/courses/categories/${courseResponse.data.category}/`, 
            config
          );
          setCategory(categoryResponse.data);
        }
        
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch course details');
        console.error('Error fetching course details:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourseData();
  }, [id]);

  const handleProgressUpdate = async (newProgress) => {
    try {
      // Get token from local storage
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Token ${token}` }
      };
      
      // Update course progress
      const response = await axios.patch(
        `/api/courses/courses/${id}/`, 
        { progress: newProgress },
        config
      );
      
      setCourse(response.data);
    } catch (err) {
      console.error('Error updating progress:', err);
      alert('Failed to update progress');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      return;
    }
    
    try {
      setIsDeleting(true);
      
      // Get token from local storage
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Token ${token}` }
      };
      
      // Delete the course
      await axios.delete(`/api/courses/courses/${id}/`, config);
      
      // Redirect to courses list
      history.push('/courses');
    } catch (err) {
      setDeleteError(err.message || 'Failed to delete course');
      console.error('Error deleting course:', err);
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading course details...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/courses" className="back-btn">Back to Courses</Link>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="not-found-container">
        <h2>Course Not Found</h2>
        <p>The course you are looking for does not exist or has been deleted.</p>
        <Link to="/courses" className="back-btn">Back to Courses</Link>
      </div>
    );
  }

  return (
    <div className="course-detail-container">
      <div className="course-detail-header">
        <div className="course-detail-title">
          <h1>{course.name}</h1>
          {category && <span className="course-category-tag">{category.name}</span>}
        </div>
        
        <div className="course-detail-actions">
          <Link to={`/courses/${id}/edit`} className="edit-btn">Edit Course</Link>
          <button 
            className="delete-btn" 
            onClick={handleDelete} 
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Course'}
          </button>
        </div>
      </div>
      
      {deleteError && (
        <div className="delete-error-message">
          {deleteError}
        </div>
      )}
      
      <div className="course-detail-content">
        <div className="course-detail-info">
          <div className="course-description">
            <h2>Description</h2>
            <p>{course.description || 'No description provided.'}</p>
          </div>
          
          <div className="course-progress-section">
            <h2>Progress</h2>
            <div className="progress-container">
              <div className="progress-bar-detail">
                <div 
                  className="progress-fill-detail" 
                  style={{ width: `${course.progress * 100}%` }}
                ></div>
              </div>
              <span className="progress-percentage">{Math.round(course.progress * 100)}%</span>
            </div>
            
            <div className="progress-controls">
              <button 
                className="progress-button" 
                onClick={() => handleProgressUpdate(0)}
                disabled={course.progress === 0}
              >
                0%
              </button>
              <button 
                className="progress-button" 
                onClick={() => handleProgressUpdate(0.25)}
                disabled={course.progress === 0.25}
              >
                25%
              </button>
              <button 
                className="progress-button" 
                onClick={() => handleProgressUpdate(0.5)}
                disabled={course.progress === 0.5}
              >
                50%
              </button>
              <button 
                className="progress-button" 
                onClick={() => handleProgressUpdate(0.75)}
                disabled={course.progress === 0.75}
              >
                75%
              </button>
              <button 
                className="progress-button" 
                onClick={() => handleProgressUpdate(1.0)}
                disabled={course.progress === 1.0}
              >
                100%
              </button>
            </div>
            
            <div className="custom-progress">
              <label htmlFor="custom-progress-input">Custom Progress:</label>
              <input
                id="custom-progress-input"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={course.progress}
                onChange={(e) => handleProgressUpdate(parseFloat(e.target.value))}
                className="custom-progress-slider"
              />
              <span>{Math.round(course.progress * 100)}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="course-detail-footer">
        <Link to="/courses" className="back-to-courses-btn">Back to Courses</Link>
      </div>
    </div>
  );
};

export default CourseDetail;
