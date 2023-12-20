import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { api } from "../utils/apiHelper";

const CreateCourse = () => {
    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [errors, setErrors] = useState([]);
    const title = useRef(null);
    const description = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const course = {
            title: title.current.value,
            description: description.current.value,
            materialsNeeded: materialsNeeded.current.value,
            estimatedTime: estimatedTime.current.value,
            userId: authUser ? authUser.id : null
        };

        try {
            const response = await api('/courses', 'POST', course, authUser);

            if (response.status === 201) {
                console.log(`${course.title} was successfully created`);
                navigate('/');
            } else if (response.status === 400) {
                const data = await response.json();
                console.log(data.errors);
                setErrors(data.errors);
            }
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    };
       
    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/');
    };

    console.log(authUser)
        
    return (
          <div className="wrap">
            <h2>Create Course</h2>
            {errors.length ? (
              <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                  {errors.map((error) => (
                    <li>{error}</li>
                  ))}
                </ul>
              </div>
            ) : null}
        
            <form onSubmit={handleSubmit}>
              <div className="main--flex">
                <div>
                  <label htmlFor="courseTitle">Course Title</label>
                  <input id="courseTitle" name="courseTitle" type="text" ref={title} />
                  <p>By {authUser.firstName} {authUser.lastName}</p>
        
                  <label htmlFor="courseDescription">Course Description</label>
                  <textarea id="courseDescription" name="courseDescription" ref={description} />
                </div>
                <div>
                  <label htmlFor="estimatedTime">Estimated Time</label>
                  <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime} />
                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded} />
                </div>
              </div>
        
              <button className="button" type="submit">Create Course</button>
              <button className="button button-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </form>
          </div>
        );
        }
        
export default CreateCourse;