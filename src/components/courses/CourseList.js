
// frontend/src/components/courses/CourseList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CourseList.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    minProgress: '',
    maxProgress: '',
    search: ''
  });

  useEffect(() => {
    const fetchCoursesAndCategories = async () => {
      try {
        setLoading(true);
        
        // Get token from local storage
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Token ${token}` }
        };
        
        // Fetch courses and categories in parallel
        const [coursesResponse, categoriesResponse] = await Promise.all([
          axios.get('/api/courses/courses/', config),
          axios.get('/api/courses/categories/', config)
        ]);
        
        setCourses(coursesResponse.data.results || coursesResponse.data);
        setCategories(categoriesResponse.data.results || categoriesResponse.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch courses');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCoursesAndCategories();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      
      if (filters.category) {
        params.append('category_id', filters.category);
      }
      
      if (filters.minProgress) {
        params.append('min_progress', filters.minProgress);
      }
      
      if (filters.maxProgress) {
        params.append('max_progress', filters.maxProgress);
      }
      
      if (filters.search) {
        params.append('search', filters.search);
      }
      
      // Get token from local storage
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Token ${token}` },
        params
      };
      
      const response = await axios.get('/api/courses/courses/', config);
      setCourses(response.data.results || response.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to apply filters');
      console.error('Error applying filters:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = async () => {
    setFilters({
      category: '',
      minProgress: '',
      maxProgress: '',
      search: ''
    });
    
    try {
      setLoading(true);
      
      // Get token from local storage
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Token ${token}` }
      };
      
      const response = await axios.get('/api/courses/courses/', config);
      setCourses(response.data.results || response.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to reset filters');
      console.error('Error resetting filters:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && courses.length === 0) {
    return <div className="loading">Loading courses...</div>;
  }

  return (
    <div className="course-list-container">
      <div className="course-header">
        <h1>Courses</h1>
        <Link to="/courses/new" className="add-course-btn">Add New Course</Link>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="filters-container">
        <div className="filter-group">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search courses..."
            className="search-input"
          />
        </div>
        
        <div className="filter-group">
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="category-select"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <input
            type="number"
            name="minProgress"
            value={filters.minProgress}
            onChange={handleFilterChange}
            placeholder="Min progress"
            min="0"
            max="1"
            step="0.1"
            className="progress-input"
          />
          <input
            type="number"
            name="maxProgress"
            value={filters.maxProgress}
            onChange={handleFilterChange}
            placeholder="Max progress"
            min="0"
            max="1"
            step="0.1"
            className="progress-input"
          />
        </div>
        
        <div className="filter-actions">
          <button onClick={applyFilters} className="apply-filters-btn">Apply Filters</button>
          <button onClick={resetFilters} className="reset-filters-btn">Reset</button>
        </div>
      </div>
      
      {courses.length === 0 ? (
        <div className="no-courses">
          <p>No courses found. Add a new course to get started!</p>
          <Link to="/courses/new" className="add-course-btn">Add New Course</Link>
        </div>
      ) : (
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-info">
                <h3 className="course-name">{course.name}</h3>
                <p className="course-category">
                  {categories.find(cat => cat.id === course.category)?.name || 'Uncategorized'}
                </p>
                <p className="course-description">
                  {course.description ? (
                    course.description.length > 100 ? 
                      `${course.description.substring(0, 100)}...` : 
                      course.description
                  ) : 'No description provided'}
                </p>
              </div>
              
              <div className="course-progress-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${course.progress * 100}%` }}
                  ></div>
                </div>
                <span className="progress-text">{Math.round(course.progress * 100)}% Complete</span>
              </div>
              
              <div className="course-actions">
                <Link to={`/courses/${course.id}`} className="view-course-btn">View Details</Link>
                <Link to={`/courses/${course.id}/edit`} className="edit-course-btn">Edit</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;

