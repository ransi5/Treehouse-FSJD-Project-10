//  import dependencies
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Form from "./Form";

// `UserSignUp` component renders sign up form and processes form submission
const UserSignUp = (props) => {

  const navigate = useNavigate();
  let [ errors, setErrors ] = useState([]);

  let firstName, lastName, emailAddress, password;
  //  `submit` function to process form submission
  const submit = (event) => {
    const { context } = props;
    const user = {firstName: `${firstName.value}`, lastName: `${lastName.value}`, emailAddress: `${emailAddress.value}`, password:`${password.value}`};
    //  calls `createUser` method to send post api request to create new user and processes output to display success or error messages
    context.data.createUser(user)
      .then( errors => {
        if (errors.length) {
          let errs = [];
          errors.map( (error) => {
            errs.push(error)
         })
         setErrors(errs);
       } else {
         setErrors('success');
       }
     })
    .catch( err => {
      // redirect to error page with error in React's location state object
      navigate('/error', { state: { errors: err } });
    });
  }

  const cancel = (event) => {
    navigate('/');
  }

  return (
    <div className="form--centered">
      <h2>Sign Up</h2>

      <Form
        cancel={cancel}
        errors={errors}
        submit={submit}
        submitButtonText="Sign Up"
        elements={() => (
          <>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              ref={fName => firstName = fName}
              placeholder="Enter your first name"
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              ref={lName => lastName = lName}
              placeholder="Enter your last name"
            />
            <label htmlFor="emailAddress">Email Address</label>
            <input
              id="emailAddress"
              name="emailAddress"
              type="email"
              ref={email => emailAddress = email}
              placeholder="Enter email"
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              ref={pass => password = pass}
              placeholder="Enter password"
            />
          </>
        )}
      />
      <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
    </div>
  )
}

export default UserSignUp;
