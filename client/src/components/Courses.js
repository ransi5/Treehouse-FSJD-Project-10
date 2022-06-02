//  import dependencies
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router';

//  `Courses` functional component
const Courses = (props) => {

  let [ courses, setCourses ] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // `useEffect` hook call the `getCourses` to make api request and render all courses
  useEffect(() => {
    const { context } = props;

    context.data.getCourses()
      .then( data => {
        setCourses(data.courses);
      })
      .catch( error => navigate('/error', { state: { errors: error}}))
  }, [props])

  return (
    <div className="wrap main--grid">
      {
        courses.map(course => {
          return (<Link key={course.id} to={`${course.id}`} className='course--module course--link'>
            <h2 className='course--label'>Course</h2>
            <h3 className='course--title'>{course.title}</h3>
          </Link>);
        })
      }
      <Link key={courses.length + 1} className="course--module course--add--module" to='create'>
        <span className="course--add--title">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
          viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
          New Course
        </span>
      </Link>
    </div>
  )
}

export default Courses;
