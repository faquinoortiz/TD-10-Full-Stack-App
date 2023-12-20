import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext"; 
//Utilizes usercontext to make sure that the user is properly log out and redirected to the course list page
const UserSignOut = () => {

  const { actions } = useContext(UserContext);
   useEffect(() => actions.signOut )

   return (
   
   <Navigate to ='/' replace/>
  
   )
   }

export default UserSignOut;