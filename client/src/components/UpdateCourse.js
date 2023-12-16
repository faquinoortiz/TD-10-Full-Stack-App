import React, { useState, useRef, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext";

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
                const response = await fetch(`/api/courses/${id}`);
                const json = await response.json();

                if (response.status === 200) {
                    setCourse(json);
                    setIsLoaded(true);
                } else if (response.status === 404) {
                    navigate('/notfound');
                } else {
                    navigate('/error');
                }
            } catch (error) {
                console.log("Error fetching data", error);
                navigate('error');
            }
        };

        fetchCourse();
    }, [id, navigate]);

    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const credentials = {
            username: authUser.emailAddress,
            password: authUser.password,
        };

        const body = {
            title: title.current.value,
            description: description.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
            userId: authUser.id,
        };

      
        // Use the 'body' object to send the updated course data

        try {
            const response = await fetch(`/api/courses/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (response.status === 204) {
                console.log('Course has been updated');
                navigate('/');
            } else if (response.status === 403) {
                throw new Error('/forbidden');
            } else if (response.status === 400) {
                navigate('/error');
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log("There was an error updating the course", error);
        }
    };

    return (
        <div className="wrap">
            <h2>Update Course</h2>
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input
                            id="courseTitle"
                            name="courseTitle"
                            type="text"
                            ref={title}
                            defaultValue={course.title}
                        />

                        <p>By {authUser.firstName} {authUser.lastName}</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea
                            id="courseDescription"
                            name="courseDescription"
                            ref={description}
                            defaultValue={course.description}
                        />
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            ref={estimatedTime}
                            defaultValue={course.estimatedTime}
                        />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea
                            id="materialsNeeded"
                            name="materialsNeeded"
                            ref={materialsNeeded}
                            defaultValue={course.materialsNeeded}
                        />
                    </div>
                </div>
                <button className="button" type="submit">
                    Update Course
                </button>
                <button
                    className="button button-secondary"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default UpdateCourse;