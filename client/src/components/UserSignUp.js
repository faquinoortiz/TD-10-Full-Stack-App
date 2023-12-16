import React, { useContext, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from '../context/UserContext';

function UserSignUp() {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { actions } = useContext(userContext);
    const firstName = useRef(null);
    const lastName = useRef(null);
    const emailAddress = useRef(null);
    const password = useRef(null);

    const handleCancel = (e) => {
        e.preventDefault();
        navigate("./");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value,
        };

        try {
            const res = await api('users', 'POST');
            if (res.status === 201) {
                console.log(`${user.firstName} is signed in`);
                await actions.signIn(user);
                navigate('./');
            } else if (res.status === 400) {
                const errorData = await res.json();
                setErrors(errorData.errors);
            } else {
                throw new Error();
            }
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    };

    return (
        <div className="form--centered">
            <h2>Sign Up</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" ref={firstName} />
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text" ref={lastName} />
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress} />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" ref={password} />
                <button className="button" type="submit">Sign Up</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
            <br />
            <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
        </div>
    );
}

export default UserSignUp;