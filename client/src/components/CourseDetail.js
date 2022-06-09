// import dependencies
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown'

// `RenderButtons` functional component display buttons dependant on user authentication and if user owns the course
const RenderButtons = (props) => {
  if (props.userId === props.authenticatedUserId) {
    return (
      <div className="actions--bar">
          <div className="wrap">
            <Link className="button" to="update">Update Course</Link>
            <Link className="button" to="" onClick={props.handleDelete}>Delete Course</Link>
            <Link className="button button-secondary" to="/">Return to List</Link>
          </div>
        </div>
    )
  } else {
      return (
      <div className="actions--bar">
        <div className="wrap">
          <Link className="button button-secondary" to="/">Return to List</Link>
        </div>
      </div>
    )
  }
}

// `CourseDetail` functional component
const CourseDetail = (props) => {

  let [ course, setCourse ] = useState([]);
  let [ user, setUser ] = useState([]);
  const { context } = props;
  let { id } = useParams();
  let navigate = useNavigate();

  //  `courseDelete` function deletes the requested course on click of delete button
  function courseDelete() {
    if (window.confirm("Are you sure you want to delete this course?")) {
      // deleteCourse method called
      context.data.deleteCourse(id)
        .then((errors) => {
          if (errors.length) {

            window.alert(`Course delete failed: ${errors}`);
          } else {
            window.alert("requested course successfully deleted");
            navigate('/courses');
          }
        })
    }
  }

  // `useEffect` hook calls the `getCourse` api method to and processes information to
  //  render the requested course or display appropriate error messages
  useEffect(() => {
    context.data.getCourse(id)
      .then((data) => {
        if (data.status && data.status === 404) {
          navigate('/notfound');
        } else if (data.status && data.status === 500) {
          navigate('/error', { state: { errors: data}});
        } else {
          setCourse(data.courses);
          setUser(data.courses.User);
        }
      })
      .catch((e) => {
        navigate('/error', { state: { errors: e } });
      })
  }, [context, id, navigate])

  return (
    <>
      <RenderButtons
        userId={course.userId}
        authenticatedUserId={context.authenticatedUser ? context.authenticatedUser.id : 0}
        handleDelete={courseDelete}
      />

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>{user.firstName} {user.lastName}</p>
              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>

              <ReactMarkdown className="course--detail--list">{course.materialsNeeded}</ReactMarkdown>

            </div>
          </div>
        </form>
      </div>
    </>
  )
}



export default CourseDetail;
