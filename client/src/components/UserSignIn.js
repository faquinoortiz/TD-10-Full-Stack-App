import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const UserSignIn = () => {
    const [formData, setFormData] = useState({
        emailAddress: "",
        password: "",
    });

    const passwordRef = useRef(null); // Ref for password input
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        
        passwordRef.current.disabled = true;

        try {
            
            console.log("Simulating successful sign-in");

    // Redirect to the list of courses or another route
            navigate("/courses");
        } catch (error) {
            console.error("Error signing in:", error);
            
        } finally {
    
            passwordRef.current.disabled = false;
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn}>
                <label htmlFor="emailAddress">Email Address</label>
                <input
                    type="email"
                    id="emailAddress"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    ref={passwordRef}
                    required
                />

                <button type="submit">Sign In</button>
                <button type="button" onClick={() => navigate("/courses")}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default UserSignIn;