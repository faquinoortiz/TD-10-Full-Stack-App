import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import AuthUserContext from "../path/to/AuthUserContext"; // Update the path accordingly

function CourseDetail() {
  const [course, setCourse] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const authUser = useContext(AuthUserContext); // Assuming authUser is the context

  // Fetch the details of the specific course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${id}`, {
          method: 'GET',
        });

        if (response.status === 200) {
          setCourse(await response.json());
        } else if (response.status === 400) {
          navigate('/notfound');
        } else {
          navigate('/error');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourse();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + authUser.getToken(), // Adjust accordingly
        },
      });

      if (response.status === 204) {
        console.log('Course has been deleted');
        navigate('/');
      } else if (response.status === 403) {
        navigate('/forbidden');
      } else if (response.status === 500) {
        navigate('/error');
      } else {
        throw Error();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
   
      <main>
        <div className="actions--bar">
          <div className="wrap">
            <Link className="button" to={`/courses/${id}/update`}>
              Update Course
            </Link>
            <button className="button" onClick={handleDelete}>
              Delete Course
            </button>
          </div>
        </div>
  
        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{course.title}</h4>
                <p>By {course.firstName} {course.lastName}</p>
            
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{course.estimatedTime}</p>
  
                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                
                </ul>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }
  

export default CourseDetail;