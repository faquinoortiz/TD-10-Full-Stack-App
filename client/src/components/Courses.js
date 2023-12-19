
import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import { api } from "../utils/apiHelper";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api("/courses", "GET");

        if (response.status === 200) {
          const json = await response.json();
          setCourses(json);
        } else if (response.status === 400) {
          console.error("Error fetching courses:", response.statusText);
          navigate("/errors");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        navigate("/errors");
      }
    };

    fetchCourses();
  }, [navigate]);

  return (
    
    <div className="wrap main--grid">
      {courses.map((course) => (
        <Link
          className="course--module course--link"
          key={course.id}
          to={`/courses/${course.id}`}
        >
          <h2 className="course--label">Course</h2>
          <h3 className="course--title">{course.title}</h3>
        </Link>
      ))}
      <Link
        className="course--module course--add--module"
        to="/courses/create"
      >
        <span className="course--add--title">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 13 13"
            className="add"
          >
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
          </svg>
          New Course
        </span>
      </Link>
    </div>
  );
};

export default Courses;