//imports

import { Route, Routes } from "react-router-dom";
import UserContext from "./context/UserContext";
import Header from "./components/Header";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import CreateCourse from "./components/CreateCourse";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UpdateCourses from "./components/UpdateCourse";
import PrivateRoute from "./components/PrivateRoute"




function App() {
return (
<div>
<Header />
<Routes>
<Route path="/" element={<Courses />} />
<Route element={<PrivateRoute />} />
<Route path="/" element={<CreateCourse />} />
<Route path="/signin" element={<UserSignIn />} />
<Route path="/signup" element={<UserSignUp />} />
<Route path="/signout" element={<UserSignOut />} />
<Route path="/course" element={<Courses />} />
<Route path="/courses/:id/update" element={<UpdateCourses />} />
<Route path="/courses/:id/update" element={<CourseDetail/>} />
</Routes>
</div>
);
}

export default App;