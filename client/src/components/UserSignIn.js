//  import dependencies
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Link, useNavigate } from "react-router-dom";
// import 'Form' component
import Form from "./Form";

//  `UserSignIn` functional component initiated
const UserSignIn = (props) => {
// navigate and location methods required to redirect to another page with state
  const navigate = useNavigate();
  const location = useLocation();
  let [ errors, setErrors ] = useState([]);
  let emailAddress, password;
// `submit` function passed to form as prop and processes for submission
  const submit = (event) => {
    const { context } = props;
    const credentials = {emailAddress: `${emailAddress.value}`, password: `${password.value}`};
    //  `signIn` method from `Context Provider` class
    context.actions.signIn(credentials)
      .then(user => {
        // processes error messages
        if (!user.users) {
          setErrors([user.message])
        } else {
          //  if user authenticated navigates user back to protected page or to index page
           console.log(`SUCCESS! ${user.users.firstName} is now signed in!`);
           if (location.state) {
             navigate(location.state.from.pathname)
           } else {
             navigate('/')
           }
        }
      })
      .catch( err => {
        // redirect to error page with error in React's location state object
        navigate('/error', { state: { errors: err } });
      })
  }
  //  `cancel` redirects to index page
  const cancel = (event) => {
    navigate('/');
  }

  return (
    <div className="form--centered">
      <h2>Sign In</h2>

      <Form
        cancel={cancel}
        errors={errors}
        submit={submit}
        submitButtonText="Sign In"
        elements={() => (
          <>
            <label htmlFor="emailAddress">Email Address</label>
            <input
              id="emailAddress"
              name="emailAddress"
              type="email"
              ref={email => emailAddress = email}
              placeholder="Enter your registered email"
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
      <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>

    </div>
  )
}

export default UserSignIn;
