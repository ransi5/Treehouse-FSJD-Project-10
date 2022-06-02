import React from 'react';
import { useLocation } from 'react-router';
import { Navigate, Outlet } from 'react-router-dom';

// `PrivateRoute` functional component wraps the potected routes dependant on user authentication
// if user not authenticated it redirect the user to `sigin` route
//  it sets location state so user is redirected back to `from` route after successful user authentication
const PrivateRoute = (props) => {
  const { context } = props;
  const isAuthenticated = context.authenticatedUser;
  const location = useLocation();

  return (
    <>
      {
        isAuthenticated ?  <Outlet /> : <Navigate to="/signin" replace state={{ from: location }}/>
      }

    </>
  )
}

export default PrivateRoute;
