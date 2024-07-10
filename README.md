#[Imagihub](https://imagihub.yaredb.tech)

# Welcome to the ImagiHub Node.js server repository!
This a nodejs/express server for imagihub image sharing web app 
  @ [imagihub](https://imagihub.yaredb.tech) or [imagihub](https://imagihub.yaredb.net.et)

................
We are living in a digital world, but the hustle to just send an image,
You need to login
You must use same social media
The image is compressed
You need to share it to every one or create a group
Most of the time you need android
There are a ton of solutions for this. I just want to contribute to the cause, make an alternative easy way of sharing images.
...............

This repository contains the backend code for the ImagiHub image sharing application. The front-end code for the user interface is located in a separate repository [imagihub app](https://github.com/yaredybk/imagihub_app).

##Features:
. Secure user authentication and session management using cookies and express-session.
. Image upload functionality with file size and rate limiting.
. Image retrieval by ID with rate limiting and basic error handling.
. Heartbeat endpoint to check session validity.
. Basic routing and error handling.
. Environment variable configuration for security-sensitive data (session key, port number, rate limits).
. Limited static file serving for uploaded images.

##Dependencies:
. express: https://expressjs.com/ (web framework)
. cookie-parser: https://www.npmjs.com/package/cookie-parser (parses cookies)
. helmet: https://www.npmjs.com/package/helmet (security middleware)
. express-session: https://www.npmjs.com/package/express-session (session management)
. express-fileupload: https://www.npmjs.com/package/express-fileupload (file upload handling)
. express-static-gzip: https://github.com/tkoenig89/express-static-gzip (serves static files with gzip compression)
. rate-limit: https://www.npmjs.com/package/express-rate-limit (rate limiting middleware)
. dotenv: https://www.npmjs.com/package/dotenv/v/14.0.0 (loads environment variables from a .env file)

##Database:
///////////////

##Getting Started:
1. Clone this repository.
2. Install dependencies: npm install
3. Create a .env file in the project root directory and set the following environment variables:
  . SESSION_KEY: A secret key used for session encryption.
  . NODE_PORT: The port number on which the server will listen (e.g., 3000).
  . LIMIT_ALL: The maximum number of allowed image requests or uploads within a 30-minute window (default recommended: 5).
  . LIMIT_UPLOAD: The maximum number of allowed image uploads within a 30-minute window (default recommended: 3, as uploads are more resource-intensive).
4. Configure your database connection details (likely in a separate configuration file).
5. Run the server: npm start
##Additional Notes:
. This is a basic backend implementation for ImagiHub. Further development might involve additional features, security enhancements, and database integration.
. Refer to the code within the src directory for more details about specific functionalities.
##Front-end Integration:
. The front-end code (React application) is located in a separate repository and interacts with this backend server through API calls.

We hope this README provides a clear overview of the ImagiHub Node.js server. Feel free to explore the codebase and contribute to the project's development!

Developer
Name  Yared b.
From  [Addis Ababa, Ethiopia](https://maps.app.goo.gl/6cG81dKHbFiMCmG7A)
Github  [yaredybk](https://github.com/yaredybk)
X (twitter)  [yared_bekuru](https://x.com/yared_bekuru)
_  6th July, 2024 G.C.

Checkout the code
app  [imagihub app](https://github.com/yaredybk/imagihub_app)
server  [imagihub server](https://github.com/yaredybk/imagihub_server)
