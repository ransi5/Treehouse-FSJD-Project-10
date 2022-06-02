// import dependencies
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router';
import Form from "./Form";

//  `UpdateCourse` component renders form and course details and processes form submission
const UpdateCourse = (props) => {

  let courseTitle, courseDescription, estimatedTime, materialsNeeded;
  let [ errors, setErrors ] = useState([]);
  let [ course, setCourse ] = useState([]);
  let [ description, setDescription ] = useState([]);
  let [ materials, setMaterials ] = useState([]);
  let [ user, setUser ] = useState([]);
  const { context } = props;
  const navigate = useNavigate();
  const location = useLocation();
  let { id } = useParams();

  //  `submit` function processes form submission request
  const submit = (event) => {
    const course = {
      title: `${courseTitle.value}`,
      description: `${courseDescription.value}`,
      estimatedTime: `${estimatedTime.value}`,
      materialsNeeded:`${materialsNeeded.value}`,
      User: context.authenticatedUser.id
    };
    //  call `updateCourse` method tto send api request and displays success or error message responses
    context.data.updateCourse(id, course)
      .then((errors) => {
        if (errors.length || errors.status) {
          if (errors.status && errors.status === 404) {
            navigate('/notfound');
          } else if (errors.status && errors.status === 403) {
            navigate('/forbidden');
          } else if (errors.status && errors.status === 500) {
            navigate('/error', { state: { errors: errors}});
          } else {
            let errs = [];
            errors.map( (error) => {
              errs.push(error)
           })
           setErrors(errs);
          }
       } else {
         setErrors('update success');
       }
     })
    .catch( err => {
      navigate('/error', { state: { errors: err}});
    });
  }

  const cancel = (event) => {
    navigate('/');
  }
  //  `strsplitter` function used to return array of description and materials string
  function strSplitter(variable, str, splitter) {
     str = str.split(`${splitter}`);
     str.map((item) => {
      variable.push(item);
    })
    return variable;
  }
  // `useEffect` hook calls `getCourse` method to fetch the course requested by user
  useEffect(() => {
    context.data.getCourse(id)
      .then((data) => {
        console.log(data.courses.User.id)
        if (data.status && data.status === 404) {
          navigate('/notfound');
        } else if (data.status && data.status === 500) {
          navigate('/error', { state: { errors: data}});
        } else if (data.courses.User.id !== context.authenticatedUser.id) {
          navigate('/forbidden')
        } else {
          let courseDescription = [];
          let materials = [];
          if (data.courses.description) {
            strSplitter(courseDescription, data.courses.description, '\n\n');
          }
          setDescription(courseDescription);
          if (data.courses.materialsNeeded) {
            strSplitter(materials, data.courses.materialsNeeded, `\n`);
          }
          setMaterials(materials);
          setCourse(data.courses);
          setUser(data.courses.User);
        }
      })
      .catch( err => {
        navigate('/error', { state: { errors: err}});
      });
  }, [context, id, navigate])

  return (
    <>
      <div className="wrap">
        <h2>Update Course</h2>
        <Form
          cancel={cancel}
          errors={errors}
          submit={submit}
          submitButtonText="Update Course"
          elements={() => (
            <>
              <div className="main--flex">
                <div>
                  <label htmlFor="courseTitle">Course Title</label>
                  <input
                    id="courseTitle"
                    name="courseTitle"
                    ref={title => courseTitle = title}
                    type="text"
                    defaultValue={course.title}
                  />

                  <p>By {user.firstName} {user.lastName}</p>

                  <label htmlFor="courseDescription">Course Description</label>
                  <textarea
                    id="courseDescription"
                    name="courseDescription"
                    ref={desc => courseDescription = desc}
                    defaultValue={course.description}
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="estimatedTime">Estimated Time</label>
                  <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    ref={time => estimatedTime = time}
                    defaultValue={course.estimatedTime}
                  />

                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                    ref={materials => materialsNeeded = materials}
                    defaultValue={course.materialsNeeded}
                  ></textarea>
                </div>
              </div>
            </>
          )}
        />
      </div>
    </>
  )
}

export default UpdateCourse;
