

console.log('### Node.js LM WIND app starting...')

// Dotenv handy for local config & debugging
require('dotenv').config()

// Core Express & logging stuff
const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const app = express()
var cors = require('cors');




// View engine setup & static content
app.use(express.static(path.join(__dirname, 'public')))

// Logging
app.use(logger('dev'))

// Parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//handling cros origin for local development
var corsOptions = {
  //origin: 'http://localhost:3000',
  //optionsSuccessStatus: 200, // For legacy browser support,
  //methods: "GET, PUT, DELETE, POST"
}

app.use(cors(corsOptions));

// Routes & controllers
app.use('/', require('./routes/client'))
app.use('/', require('./routes/employee'))
app.use('/', require('./routes/invoice'))
app.use('/', require('./routes/invoice-settings'))
app.use('/', require('./routes/user'))
app.use('/', require('./routes/visitors'))
app.use('/', require('./routes/entry'))
app.use('/', require('./routes/building-blocks'))
app.use('/', require('./routes/invitation'))
require('./routes/auth.route')(app);
require('./routes/user.route')(app);


// Make package app version a global var, shown in _foot.ejs
app.locals.version = require('./package.json').version

// Catch all route, generate an error & forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  if (req.method != 'GET') {
    err = new Error(`Method ${req.method} not allowed`)
    err.status = 500
  }

  next(err)
})

// Error handler
app.use(function(err, req, res, next) {
  console.error(`### ERROR: ${err.message}`)


  // Render the error page
  res.status(err.status || 500)
  res.render('error', {
    title: 'Error',
    message: err.message,
    error: err
  })
})



// Get values from env vars or defaults where not provided
let port = process.env.PORT || 3000

// Start the server
app.listen(port)
console.log(`### Server listening on port ${port}`)

module.exports = app