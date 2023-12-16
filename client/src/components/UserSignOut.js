import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext"; 

const UserSignOut = () => {
  const { signOut } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {

    if (signOut) {
      signOut();
    }
  
    navigate("/");
  }, [signOut, navigate]);

  return null; 
};

export default UserSignOut;