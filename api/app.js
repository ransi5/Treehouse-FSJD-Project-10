'use strict';

// load modules
const express = require('express');
var path = require('path');
const morgan = require('morgan');
const cors = require('cors');
var { sequelize, models } = require('./models');
var indexRouter = require('./routes/index');

// sequelize authentication and sync
sequelize.authenticate()
  .then((result) => {
    console.log("Connection to db established.");
  })
  .then(() => {
    sequelize.sync()
      .then((res) => {
        console.log("Sync to db complete")
      })
      .catch((err) => {
        console.log("Sync to db failed: ", err)
      })
  })
  .catch((error) => {
    console.log("Unable to connect to db: ", error);
  });

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable all CORS Requests
app.use(cors());
var corsOptions = {
  origin: 'http://localhost:3000',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false
}
app.options('*', cors())

// app.use(function(req, res, next) {
//   res.header("Cross-Origin-Resource-Policy", "same-site | same-origin | cross-origin")
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
//   next();
// });


app.use('/', indexRouter);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set port
app.set('port', process.env.PORT || 5000);

// start listening on port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
