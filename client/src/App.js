//imports
import { Route, Routes } from 'react-router-dom';
import "./styles/reset.css"
import './styles/global.css' ;


import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import Header from './components/Header'; 
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/signout" element={<UserSignOut />} />
        <Route path="/courses/:id" element={<CourseDetail />} /> 
        
        
        <Route element={<PrivateRoute/>}>
        
        <Route path="/courses/create" element={<CreateCourse />} />
        <Route path="/courses/:id/update" element={<UpdateCourse />} />
        </Route>
        
        
      </Routes>
    </div>
  );
};

export default App;