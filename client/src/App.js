import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Courses from './Courses';
import CreateCourse from '.components/CreateCourse';
import UpdateCourse from '.components/UpdateCourse';
import CourseDetail from '.components/CourseDetail';
import UserSignIn from '.components/UserSignIn';
import UserSignUp from '.components/UserSignUp';
import UserSignOut from '.components/UserSignOut';
import Header from '.components/Header'; 

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/courses/create" element={<CreateCourse />} />
        <Route path="/courses/:id/update" element={<UpdateCourse />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/signout" element={<UserSignOut />} />
        <Route path="/" element={<Courses />} />
      </Routes>
    </div>
  );
};

export default App;