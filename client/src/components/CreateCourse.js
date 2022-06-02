//  import dependencies
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Form from "./Form";


//  `CreateCourse` functional compenent renders the form to create course and processes form submission
const CreateCourse = (props) => {

  let courseTitle, courseDescription, estimatedTime, materialsNeeded;
  const navigate = useNavigate();
  let [ errors, setErrors ] = useState([]);
  const { context } = props;

  //  `submit` function to handle form submission by calling `createCourse` method to make api request.
  //  It display success or error messages
  const submit = (event) => {
    const { context } = props;
    const credentials = {emailAddress: `${context.authenticatedUser.emailAddress}`, password: `${context.authenticatedUser.password}`};
    const course = {
      title: `${courseTitle.value}`,
      description: `${courseDescription.value}`,
      estimatedTime: `${estimatedTime.value}`,
      materialsNeeded: `${materialsNeeded.value}`,
      userId: `${context.authenticatedUser.id}`
    }

    context.data.createCourse(course, credentials)
      .then((errors) => {
        if (errors.length && !errors.status) {
          let errs = [];
          errors.map( (error) => {
            errs.push(error)
         })
         setErrors(errs);
       } else if (errors.status && errors.status === 500) {
         navigate('/error', { state: { errors: errors}});
       } else {
         setErrors('create success');
       }
     })
    .catch( err => {
      navigate('/error', { state: { errors: err } });
    });
  }

  const cancel = (event) => {
    navigate('/');
  }

  return (
    <>
      <div className="wrap">
        <h2>Create Course</h2>

        <Form
          cancel={cancel}
          errors={errors}
          submit={submit}
          submitButtonText="Create Course"
          elements={() => (
            <>
              <div className="main--flex">
                <div>
                  <label htmlFor="title">Course Title</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    ref={title => courseTitle = title}
                    placeholder='Enter course title'
                  />

                  <p>By {context.authenticatedUser.firstName} {context.authenticatedUser.lastName}</p>

                  <label htmlFor="description">Course Description</label>
                  <textarea
                    id="description"
                    name="description"
                    ref={desc => courseDescription = desc}
                    placeholder="Enter course description"
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="estimatedTime">Estimated Time</label>
                  <input
                    id="estimatedTime"
                    name="estimatedTime"
                    ref={time => estimatedTime = time}
                    placeholder="Enter estimated time to complete course"
                  />

                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                    ref={materials => materialsNeeded = materials}
                    placeholder="Enter materials required to complete course"
                  ></textarea>
                </div>
              </div>
            </>
            )
          }
        />
      </div>
    </>
  )
}

export default CreateCourse;
