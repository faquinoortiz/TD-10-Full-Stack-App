import React, { useState, useRef, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

function UserSignIn() {
const {actions} = useContext(UserContext);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const emailAddress = useRef(null);
  const password = useRef(null);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    let from = "/";
    if (location.state) {
      from = location.state.from;
    }
//Sign in to include accurate email and password in order to have a successful login otherwise it will give user an error 
    const credentials = {
      emailAddress: emailAddress.current.value,
      password: password.current.value,
    };

    try {
      const user = await actions.signIn(credentials);
      if (user) {
        navigate(from);
      } else {
        setErrors(["Sign-in was unsuccessful"]);
      }
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };
  //navigates back to course list
  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="form--centered">
      <h2>Sign In</h2>
      {errors.length ? (
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            {errors.map((error) => (
              <li> {error}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <label htmlFor="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress} />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" ref={password} />

        <button className="button" type="submit">
          Sign In
        </button>
        <button className="button button-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </form>
      <p>
        Don't have a user account? Click here to <Link to="/signup">sign up</Link>!
      </p>
    </div>
  );
}

export default UserSignIn;