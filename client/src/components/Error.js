// import dependencies
import React from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from "react-router-dom";

const Error = (props) => {
// `navigate` and `location` methods required to get state values passed through `navigate` method in the redirecting page
  const navigate = useNavigate();
  const location = useLocation();
  const error = location.state.errors || props.error;
  console.log(error);
  return (
    <div className="wrap">
      <h2>Error: {error.status} - {error.name || error.message}</h2>
      <p>Sorry! We just encountered an unexpected error.</p>
      <p>{error.message}</p>
    </div>
  )
}

export default Error;
