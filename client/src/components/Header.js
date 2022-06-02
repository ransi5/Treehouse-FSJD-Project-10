// import dependencies
import React from 'react';
import { NavLink, Link } from "react-router-dom";

const Header = (props) => {
  const { context } = props
  // JSX conditional statement displays links dependant on user authentication
  return (
    <header>
        <div className="wrap header--flex">
            <h1 className="header--logo"><Link to='/courses'>Courses</Link></h1>
            <nav>
              <ul className="header--signedout">
                {context.authenticatedUser ?
                  <React.Fragment>
                    <li>Welcome, {context.authenticatedUser.firstName}!</li>
                    <li><Link to='/signout'>Sign Out</Link></li>
                  </React.Fragment>
                :
                  <React.Fragment>
                    <li><NavLink to='/signup'>Sign Up</NavLink></li>
                    <li><NavLink to='/signin'>Sign In</NavLink></li>
                  </React.Fragment>
                }

              </ul>
            </nav>
        </div>
    </header>
  )
}

export default Header;
