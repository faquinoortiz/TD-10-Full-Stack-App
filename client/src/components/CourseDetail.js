import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch('/api/courses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h1>List of Courses</h1>
        <ul>
          {courses.map(course => (
            <li key={course.id}>
              {/* Link to Course Detail screen */}
              <Link to={`/courses/${course.id}`}>{course.title}</Link>
            </li>
          ))}
        </ul>

        {/* Link to Create Course screen */}
        <Link to="/create-course">Create Course</Link>
      </header>
    </div>
  );
}

export default Courses;