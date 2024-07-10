# [Imagihub](https://imagihub.yaredb.tech)

# Welcome to the ImagiHub Node.js server repository!
ImagiHub is a Node.js server for a simple image-sharing web application. It aims to provide a user-friendly and efficient way to share images without the limitations of existing platforms.
  @ [imagihub](https://imagihub.yaredb.tech) or [imagihub](https://imagihub.yaredb.net.et)

----------------------------------------------------------

We are living in a digital world, but the hustle to just send an image,
* You need to login
* You must use the same social media
* The image is compressed
* You need to share it with everyone or create a group
* Most of the time you need an android
There are a ton of solutions for this. I just want to contribute to the cause and make an alternative easy way of sharing images. 

----------------------------------------------------------

This repository contains the backend code for the ImagiHub image-sharing application. The front-end code for the user interface is located in a separate repository [imagihub app](https://github.com/yaredybk/imagihub_app).

## Features:
* Secure user authentication and session management using cookies and express-session.
* Image upload functionality with file size and rate limiting.
* Image retrieval by ID with rate limiting and basic error handling.
* Heartbeat endpoint to check session validity.
* Basic routing and error handling.
* Environment variable configuration for security-sensitive data (session key, port number, rate limits).
* Limited static file serving for uploaded images.
* Automatic image cleanup: The server can be configured to automatically delete images older than a certain time threshold (e.g., 2 hours).

## Dependencies:
* express: https://expressjs.com/ (web framework)
* cookie-parser: https://www.npmjs.com/package/cookie-parser (parses cookies)
* helmet: https://www.npmjs.com/package/helmet (security middleware)
* express-session: https://www.npmjs.com/package/express-session (session management)
* express-fileupload: https://www.npmjs.com/package/express-fileupload (file upload handling)
* express-static-gzip: https://github.com/tkoenig89/express-static-gzip (serves static files with gzip compression)
* rate-limit: https://www.npmjs.com/package/express-rate-limit (rate limiting middleware)
* dotenv: https://www.npmjs.com/package/dotenv/v/14.0.0 (loads environment variables from a .env file)

## Database Setup:
The [imagihub setup.sql](https://github.com/yaredybk/imagihub_server/blob/main/sql/imagihub%20setup.sql) SQL code sets up the necessary tables, views, and stored procedure in a MySQL database named imagihub_anon_v1. Here's a breakdown of the functionalities:

1. Schema and Table Creation:
* Creates a schema named imagihub_anon_v1 if it doesn't exist.
* Creates a table named images to store image metadata:
  * id_image: Auto-incrementing integer primary key for the image.
  * i_name: Name of the image file (without extension).
  * i_affix: Unique identifier for the image (randomly generated 4-character string).
  * i_ext: Image file extension (e.g., "jpg", "png").
  * created_at: Date and time the image was uploaded (automatically set to current timestamp).
  * id_user: Foreign key referencing a user table (optional, not included in the provided code).
* Creates a unique key on i_affix to ensure no duplicate image identifiers.

2. Image View Creation:
* Creates a view named images_with_dir that combines image data with a constructed directory path:
  * Select relevant columns from the images table.
  * Concatenates i_name, _, i_affix, and . with i_ext to create a virtual directory path for the image (likely used for file storage).

3. Stored Procedure Creation:
* Creates a stored procedure named new_image to handle image uploads:
  * Takes two arguments: i_name (image filename) and ext (image extension).
  * Uses a transaction to ensure data consistency.
  * Generates a random 4-character i_affix and a unique identifier (@ii) using UUID.
  * Inserts a new image record into the images table with provided details and generates i_affix.
  * Retrieves the newly inserted image data with the constructed directory path from the images_with_dir view.
  * Commits the transaction on successful insertion.
  * Catches potential SQL exceptions and rolls back the transaction with an error message.
[note] Please note that the method used to generate the random string sometimes generates a null string!
[possible fix] use conv(left(uuid(),5),16,36)

4. Database User Permissions:
* Revokes all privileges and the grant option from the user imagihub (security best practice).
* Grants basic usage privileges on the MySQL server to imagihub.
* Grants imagihub select, insert, update, and delete permissions on the imagihub_anon_v1 schema.
* Grants imagihub execute permission on the new_image stored procedure.
* Flushes privileges to ensure changes take effect.

## Note:
* The provided code assumes a MySQL database server. You might need adjustments for other database systems.
* The id_user column in the images table suggests potential future integration with user accounts.

## Getting Started:
1. Clone this repository.
2. Install dependencies: npm install
3. Create a .env file in the project root directory and set the following environment variables:
  * SESSION_KEY: A secret key used for session encryption.
  * NODE_PORT: The port number on which the server will listen (e.g., 3000).
  * LIMIT_ALL: The maximum number of allowed image requests or uploads within a 30-minute window (default recommended: 5).
  * LIMIT_UPLOAD: The maximum number of allowed image uploads within a 30-minute window (default recommended: 3, as uploads are more resource-intensive).
4. Configure your database connection details (likely in a separate configuration file).
5. Run the server: npm start

## Additional Notes:
* This is a basic backend implementation for ImagiHub. Further development might involve additional features, security enhancements, and more database features.
* Refer to the code within the src directory for more details about specific functionalities.

## Front-end Integration:
* The front-end code (React application) is located in a separate repository and interacts with this backend server through API calls.

## Developer
* Name  Yared b.
* From  [Addis Ababa, Ethiopia](https://maps.app.goo.gl/6cG81dKHbFiMCmG7A)
* Github  [yaredybk](https://github.com/yaredybk)
* X(twitter)  [yared_bekuru](https://x.com/yared_bekuru)
* _  6th July, 2024 G.C.

## Checkout the code
* app  [imagihub app](https://github.com/yaredybk/imagihub_app)
* server  [imagihub server](https://github.com/yaredybk/imagihub_server)

## Acknowledgments
* [ALX Africa - ALX Africa](https://www.alxafrica.com/)
* [.Tech Domains](https://get.tech)
* [Grammarly](https://www.grammarly.com)
* To all my family and friends who continue to encourage me
* I had some help setting up this README file from [Gemini by Google](https://gemini.google.com). Their large language model capabilities were instrumental in providing guidance and suggestions.


I hope this README provides a clear overview of the ImagiHub Node.js server. Feel free to explore the codebase and contribute to the project's development!
