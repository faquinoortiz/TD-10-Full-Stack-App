import React, { useContext, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { api } from "../utils/apiHelper";

// Information for User to be able to sign up
function UserSignUp() {
    
    const { actions } = useContext(UserContext);
    const navigate = useNavigate();
    
    const firstName = useRef(null);
    const lastName = useRef(null);
    const emailAddress = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        const user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value,
        };
//Sets the validation errors from API, the user is only able to submit if all field required are filled
        try {
            const res = await api('/users', 'POST', user)
            if (res.status === 201){
                await actions.signIn(user)
                navigate('/')
            } else if (res.status === 400) {
                const errorData = await res.json()
                setErrors(errorData.errors.errors)
                console.log(errorData)
            } else {
                throw new Error()
            }
            } catch (error) {
                console.log(`Errors: ${error}`)
            }
         
    };

    //Will navigate back to the list of course if "Cancel" buttpon is selected
    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <div className="form--centered">
        <h2>Sign Up</h2>
        {errors.length ? 
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error) => (
                <li> {error}</li>
              ))}
            </ul>
          </div>
         : null}
            
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