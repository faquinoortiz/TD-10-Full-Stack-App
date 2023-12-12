import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserSignUp = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSignUp = (e) => {
        e.preventDefault();

        // Your sign-up logic here
        // You can use the formData to send a request to your API for user registration

        // For example, you might use the fetch function:
        // fetch("/api/users", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(formData),
        // })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     // Handle successful sign-up
        //     console.log("User signed up:", data);

        //     // Navigate to the list of courses or another route
        //     navigate("/courses");
        //   })
        //   .catch((error) => {
        //     console.error("Error signing up:", error);
        //     // Handle sign-up error
        //   });

        // For this example, we'll simulate a successful sign-up and navigate to the list of courses
        console.log("Simulating successful sign-up");
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
                        <ul className="header--signedout">
                            <li>
                                <Link to="/sign-up">Sign Up</Link>
                            </li>
                            <li>
                                <Link to="/sign-in">Sign In</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main>
                <div className="form--centered">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSignUp}>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        <label htmlFor="emailAddress">Email Address</label>
                        <input
                            id="emailAddress"
                            name="emailAddress"
                            type="email"
                            value={formData.emailAddress}
                            onChange={handleChange}
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button className="button" type="submit">
                            Sign Up
                        </button>
                        <button
                            className="button button-secondary"
                            onClick={() => navigate("/courses")}
                        >
                            Cancel
                        </button>
                    </form>
                    <p>
                        Already have a user account? Click here to{" "}
                        <Link to="/sign-in">sign in</Link>!
                    </p>
                </div>
            </main>
        </div>
    );
};

export default UserSignUp;