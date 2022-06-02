// import dependencies
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";

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

  let [ errors, setErrors ] = useState([]);
  let [ course, setCourse ] = useState([]);
  let [ description, setDescription ] = useState([]);
  let [ materials, setMaterials ] = useState([]);
  let [ user, setUser ] = useState([]);
  const { context } = props;
  let { id } = useParams();
  let navigate = useNavigate();
  // 'strSplitter' used to split course `description` and 'materialsNeeded' into array.
  // later each item in the array is rendered as paragraph or list
  function strSplitter(variable, str, splitter) {
     str = str.split(splitter);
     str.map((item) => {
      variable.push(item);
    })
    return variable;
  }

  //  `courseDelete` function deletes the requested course on click of delete button
  function courseDelete() {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setErrors([]);
      // deleteCourse method called
      context.data.deleteCourse(id)
        .then((errors) => {
          if (errors.length) {
            setErrors(errors);
            window.alert(errors);
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
          let courseDescription = [];
          let materials = [];
          if (data.courses.description) {
            strSplitter(courseDescription, data.courses.description, '\n\n');
          }
          setDescription(courseDescription);
          if (data.courses.materialsNeeded) {
            strSplitter(materials, data.courses.materialsNeeded, '\n');
          }
          setMaterials(materials);
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
              {
                description.length ?
                  description.map( (desc, index) =>
                    <p key={index}>{desc}</p>
                  )
                : description
              }

            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list" style={{listStyleType: 'none'}}>
                {
                  materials.length ?
                    materials.map( (material, index) =>
                      <li key={index}>{material}</li>
                    )
                  : materials
                }
                <li>{course.materialsNeeded}</li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}



export default CourseDetail;
