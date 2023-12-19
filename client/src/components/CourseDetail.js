import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import UserContext from "../context/UserContext";
import { api } from "../utils/apiHelper";

function CourseDetail() {
  const [courses, setCourses] = useState({});
  const [isLoaded, setisLoaded] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const authUser = useContext(UserContext); 

  // Fetch specific course
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api(`/courses/${id}`, 'GET');

        if (response.status === 200) {
          const json = await response.json();
          setCourses(json);
          setisLoaded(true);
        } else if (response.status === 404) {
          
          console.log("Course not found");
          navigate("/notfound");
        } else {
          
          throw new Error();
        }
      } catch (error) {
        
        console.error("Error fetching course:", error);
        navigate("/error");
      }
    };

    fetchCourses();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      const response = await api(`/courses/${id}`, 'DELETE', null, authUser);

      if (response.status === 204) {
        console.log('Course has been deleted');
        navigate('/');
      } else if (response.status === 403) {
        throw new Error('/forbidden');
      } else if (response.status === 400) {
        navigate('/error');
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log("There was an error deleting the course", error);
    }
  };

  return (
    <>
      <div className="actions--bar">
        <div className="wrap">
          {authUser && authUser.id === courses.userId ? (
            <>
              <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
              <button className="button" onClick={handleDelete}>Delete Course</button>
            </>
          ) : null}
          <Link className="button button-secondary" to="/">Return to List</Link>
        </div>
      </div>
      {isLoaded && (
        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{courses.title}</h4>
                <p>By {courses.firstName} {courses.lastName}</p>
                <ReactMarkdown children={courses.description} />
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{courses.estimatedTime}</p>
                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  <ReactMarkdown children={courses.materialsNeeded} />
                </ul>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default CourseDetail;