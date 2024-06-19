# imagihub nodejs/express server
# by Yared b.

const express = require('express');
require("dotenv").config();
const app = express();
const port = process.node.PORT1;
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const session = require('express-session');

// Middleware for parsing cookies
app.use(cookieParser());

// Helmet middleware for various security headers
app.use(helmet());

app.use(session({
  secret: 'your_secret_key',
  resave: false, // Don't save unmodified sessions
  saveUninitialized: true, // Create session for new users
  cookie: {
    maxAge: 1000 * 60 * 60, // One hour session timeout in milliseconds
    rolling: true // Reset cookie expiry on every request
  }
}));

// Route for the root path (/)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route for a heartbeat endpoint
app.get('/heartbeat', (req, res) => {
  if (req.session) {
    // Session exists, touch it to renew the expiry
    req.session.touch();
    res.send('Session renewed!');
  } else {
    res.status(401).send('Unauthorized'); // No session, unauthorized access
  }
});

// Start the server and listen for connections on the specified port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

