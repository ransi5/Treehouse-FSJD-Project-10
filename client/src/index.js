//import dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import withContext, { Provider } from './components/Context';
//  Import component modules
import App from './App';
import Courses from './components/Courses';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './components/PrivateRoute';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import NotFound from './components/NotFound';
import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';
import reportWebVitals from './reportWebVitals';
//  `withContext` method from `Context` to wrap the component in Consumer tags
const AppWithContext = withContext(App);
const CoursesWithContext = withContext(Courses);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const PrivateRouteWithContext = withContext(PrivateRoute);
const CreateCourseWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider>
    <Router>
      <Routes>
        <Route path="/" element={ <Navigate replace to="courses" /> } />
        {/* Nested Routes */}
        <Route path="/" element={ <AppWithContext /> } >
          <Route path="courses" element={<CoursesWithContext /> } />
          <Route path="courses/:id" element={<CourseDetailWithContext /> } />
          {/* Protected Routes */}
          <Route element={<PrivateRouteWithContext /> } >
            <Route path="courses/create" element={<CreateCourseWithContext /> } />
            <Route path="courses/:id/update" element={<UpdateCourseWithContext /> } />
          </Route>
          <Route path="signup" element={<UserSignUpWithContext /> } />
          <Route path="signin" element={<UserSignInWithContext /> } />
          <Route path="signout" element={<UserSignOutWithContext /> } />
          <Route path="error" element={<UnhandledError /> } />
          <Route path="notfound" element={<NotFound /> } />
          <Route path="forbidden" element={<Forbidden /> } />
          <Route path="*" element={<NotFound /> } />
        </Route>
      </Routes>
    </Router>
  </Provider>
);

reportWebVitals();
