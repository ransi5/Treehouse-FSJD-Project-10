import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'

// `UserSignOut` functional component removes cookies and call the `signOut` function to
//  remove the `authenticatedUser` state
const UserSignOut = (props) => {
  const { context } = props;

  useEffect(() => {
    Cookies.remove('user')
    Cookies.remove('token')
    context.actions.signOut();
  }, [context])

  return (
    <>
      <Navigate replace to="/courses" />
    </>
  )
}

export default UserSignOut;
