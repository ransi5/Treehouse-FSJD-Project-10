'use strict';

const bcrypt = require('bcrypt');
const auth = require('basic-auth');
const { Users } = require('../models');

exports.authenticateUser = async (req, res, next) => {
// `message` var initialized to provide custom error message and debugging
  let message;
// `credentials` var initialized to get user name and password
  const credentials = auth(req);
// conditional to check if user credentials exist else `Auth header not found` message is logged
  if (credentials) {
    console.log(credentials)
    const user = await Users.findOne({ where: {emailAddress: credentials.name} });
// conditional to check if user saved details in db are got else logs `User not found for username` to console
    if (user) {
      console.log(user)
      const authenticated = bcrypt.compareSync(credentials.pass, user.password);
// consdtional to check if user `credntials` and user db email and password match else logs `authentication failed` message
      if (authenticated) {
        console.log(`Authentication successful for username: ${user.emailAddress}`);
        req.currUser = user;
      } else {
        message = `Please, enter correct password for ${credentials.name}`;
      }
    } else {
      if (!credentials.name || !credentials.password) {
        message = 'Please enter valid username and password'
      } else {
        message = `User not found for username: ${credentials.name}`;
      }
    }
  } else {
    message = 'Auth header not found';
  }
// conditional checks if an error message was logged. if true it send error message else goes to next middleware
  if (message) {
    console.warn(message);
    res.status(401).json({ message: message });
  } else {
    next();
  }
}
