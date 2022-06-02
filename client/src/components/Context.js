//import dependencies
import React, { Component } from 'react';
import Cookies from 'js-cookie'
import Data from './Data';
// `React Context API` initiated
const Context = React.createContext();
// `Provider` class for `React Context API` initiated
export class Provider extends Component {
  // contstuctor method initiated
  constructor() {
    super();
    this.cookie = Cookies.get('user')
    this.data = new Data();
    this.state = {
      // condition for `authenticatedUser` persists user log in state till user signs out or for 1 day
      authenticatedUser: this.cookie ? Cookies.get('user') : null
    }
  }

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      }
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }

  // `signIn` method to called to sign in the user
  signIn = async (credentials) => {
    // `getUser` method from Data compnent called
    const user = await this.data.getUser(credentials);
    // if api return authenticated `user` cookie is set and `authenticatedUser` state updated else it returns
    // the reponse from api request
    if (user.users) {
      Cookies.set('user', JSON.stringify(user.users), { expires: 1 })
      this.setState(() => {
        return {
          authenticatedUser: user.users,
        };
      });
    }
    return user;
  }
//  `signOut` method called to set remove login state by setting `authenticatedUser` state to null
// `user` cookie is renoved in the `SignOut` component
  signOut = () => {
    this.setState(() => {
      return {
        authenticatedUser: null,
      };
    });
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */
//  `withContext` method to wrap the child component in `Context.Consumer` so child components
//  can have access to app state
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}
