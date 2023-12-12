

//imports
//import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import UserContext from "./context/UserContext";
import Header from "./components/Header";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import Courses from "./components/Courses";
import UpdateCourses from "./components/UpdateCourse"; 






function App() {
  return (
    <div>
      <Header />
      
      <UserContext.Provider>
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/signout" element={<UserSignOut />} />
          <Route path="/courses/:id/update" element={<UpdateCourses />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;