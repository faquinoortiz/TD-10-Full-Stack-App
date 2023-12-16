import React, { useState, useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { api } from '../context/UserContext'; 

const CreateCourse = () => {
    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [errors, setErrors] = useState([]);
    const title = useRef(null);
    const description = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);

    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const course = {
            title: title.current.value,
            description: description.current.value,
            materialsNeeded: materialsNeeded.current.value,
            estimatedTime: estimatedTime.current.value,
            userId: authUser ? authUser.id : null,
        };

        try {
            const response = await api('/courses', 'POST', course, authUser);

            if (response.status === 201) {
                console.log(`${course.title} was successfully created`);
                navigate('/');
            } else if (response.status === 400) {
                const data = await response.json();
                if (data.errors) {
                    console.log(data.errors);
                    setErrors(data.errors);
                }
            }
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };

    return (
        <div id="root">
            <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo">
                        <Link to="/">Courses</Link>
                    </h1>
                    <nav>
                        <ul className="header--signedin">
                            <li>Welcome, {authUser.firstName} {authUser.lastName}!</li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main>
                <div className="wrap">
                    <h2>Create Course</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="main--flex">
                            <div>
                                <label htmlFor="courseTitle">Course Title</label>
                                <input id="courseTitle" name="courseTitle" type="text" ref={title} required />

                                <label htmlFor="courseDescription">Course Description</label>
                                <textarea id="courseDescription" name="courseDescription" ref={description} required />
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime} />

                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded} />
                            </div>
                        </div>
                        <button className="button" type="submit">
                            Create Course
                        </button>
                        <button className="button button-secondary" onClick={handleCancel}>
                            Cancel
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default CreateCourse;