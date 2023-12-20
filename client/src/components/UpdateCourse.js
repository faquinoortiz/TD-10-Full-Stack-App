import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import { api } from "../utils/apiHelper";

const UpdateCourse = () => {
  const [course, setCourse] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);

  const title = useRef(null);
  const description = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api(`/courses/${id}`, "GET");
        if (response.status === 200) {
          const courseData = await response.json();
          if (authUser && authUser.id === courseData.userId) {
            setCourse(courseData);
            setIsLoaded(true);
          } else {
            console.log(`Can't update ${courseData.title}.`);
            navigate(`/courses/${id}`);
          }
        } else if (response.status === 404) {
          navigate('/notfound');
        } else {
          throw new Error('Unable to fetch course details');
        }
      } catch (error) {
        console.error("Error fetching course data", error);
        setErrors([error.message]);
      }
    };

    fetchCourse();
  }, [id, navigate, authUser]);

  const handleCancel = (event) => {
    event.preventDefault();
    navigate(`/courses/${id}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      title: title.current.value,
      description: description.current.value,
      estimatedTime: estimatedTime.current.value,
      materialsNeeded: materialsNeeded.current.value,
      userId: authUser.id,
    };

   try {
    const response = await api(`/courses/${id}`, "PUT", body, authUser);
   
      if (response.status === 204) {
        console.log('Course has been updated');
        navigate(`/courses/${id}`);
      } else if (response.status === 403) {
        throw new Error('/forbidden');
      } else if (response.status === 400) {
        navigate('/error');
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error("There was an error updating the course", error);
      setErrors([error.message]);
    }
  };

  if (isLoaded) {
    return (
      <div className="wrap">
        <h2>Update Course</h2>
        {errors.length ? (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                ref={title}
                defaultValue={course.title ? course.title : ''}
              />

              <p>By {authUser.firstName} {authUser.lastName}</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                ref={description}
                defaultValue={course.description ? course.description : ''}
              />
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                ref={estimatedTime}
                defaultValue={course.estimatedTime ? course.estimatedTime : ''}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                ref={materialsNeeded}
                defaultValue={course.materialsNeeded ? course.materialsNeeded : ''}
              />
            </div>
          </div>
          <button className="button" type="submit">Update Course </button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        );
}
}

export default UpdateCourse;