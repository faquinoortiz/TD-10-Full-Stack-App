import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const CreateCourse = () => {
    const { authUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        courseTitle: "",
        courseDescription: "",
        estimatedTime: "",
        materialsNeeded: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        
        console.log("Successful course creation");
        navigate("/courses");
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
                            <li>
                                <Link to="/sign-out">Sign Out</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main>
                <div className="wrap">
                    <h2>Create Course</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Your form content goes here */}
                    </form>
                </div>
            </main>
        </div>
    );
};

export default CreateCourse;