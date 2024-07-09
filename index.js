/**
 * imagihub nodejs/express server
 * @author Yared b.
 * @email yb12ybk@gmail.com
 */

require("dotenv").config();
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const path = require("path");
const express = require("express");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const expressStaticGzip = require("express-static-gzip");
const rateLimit = require("express-rate-limit");
const { setUp } = require("./src/config/setup.js");
const { _db } = require("./src/config/mysqlDB");
const {
    LimitFailedRetries,
    CountFailedRetries,
} = require("./src/middlewares/limit.js");
const { getImageById } = require("./src/controllers/getImageById.js");

const app = express();

app.set("trust proxy", 1); // Trust the first proxy #nginx
app.use(cookieParser()); // Middleware for parsing cookies
app.use(helmet()); // Helmet middleware for various security headers
// express session
app.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: false, // Don't save unmodified sessions
        saveUninitialized: true, // Create session for new users
        cookie: {
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV == "production",
            sameSite: true,
            maxAge: 1000 * 60 * 10, // 10 minutes session timeout in milliseconds
            rolling: true, // Reset cookie expiry on every request
        },
        name: "anon",
    })
);

// Route for the root path (/)
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// remove /api/ dir from url
app.all("/api/*", (rq, rs, nx) => {
    rq.url = rq.url.replace("/api", "");
    nx();
});
// Route for a heartbeat endpoint
app.get("/v1/heartbeat", (req, res) => {
    if (req.session) {
        // Session exists, touch it to renew the expiry
        req.session.touch();
        res.send("Session renewed!");
    } else {
        res.status(401).send("Unauthorized"); // No session, unauthorized access
    }
});
// Rate limiting middleware for image get routes
const imageIdLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes in milliseconds
    max: process.env.LIMIT_ALL, // Allow a maximum of 5 failed request
    standardHeaders: true, // Include rate limit headers in the response
    legacyHeaders: false, // Don't use deprecated headers
    message: {
        code: "TOO_MANY_REQUESTS",
        message:
            "You have exceeded the allowed number of image requests. Please try again in a few minutes.",
    },
});
// get image name by id
app.get(
    "/v1/anon/image/:id",
    imageIdLimiter,
    LimitFailedRetries,
    getImageById,
    CountFailedRetries
);
// Rate limiting middleware for the image upload route
const imageUploadLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes in milliseconds
    max: process.env.LIMIT_UPLOAD,
    standardHeaders: true, // Include rate limit headers in the response
    legacyHeaders: false, // Don't use deprecated headers
    message: {
        code: "TOO_MANY_REQUESTS",
        message:
            "You have exceeded the allowed number of image uploads. Please try again in a few minutes.",
    },
});
// file upload middleware
app.use(
    fileUpload({
        limits: { files: 1, fieldNameSize: 50, fileSize: 20 * 1024 * 1024 },
        // debug:true,
        // safeFileNames:true,
        useTempFiles: true,
        abortOnLimit: true,
        responseOnLimit: `File size limit (${
            this.limits / (1024 * 1024)
        } Mb) has been reached`,
    })
);

// "/v1/anon/images",
app.post(
    "/v1/anon/images",
    imageUploadLimiter,
    require("./src/routes/imageUploadRoutes.js"),
    (rq, rs, nx) => {
        rs.sendStatus(400);
    }
);

// static files
// Rate limiting middleware for image get routes
const imageGetLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes in milliseconds
    max: process.env.LIMIT_ALL, // Allow a maximum of 5 failed request
    standardHeaders: true, // Include rate limit headers in the response
    legacyHeaders: false, // Don't use deprecated headers
    message: {
        code: "TOO_MANY_REQUESTS",
        message:
            "You have exceeded the allowed number of image requests. Please try again in a few minutes.",
    },
});
app.use("/v1/anon/sent_images/:id", (rq, rs, nx) => {
    rq.url = rq.url.replace("/sent_images", "/images");
    nx();
});
// "/v1/anon",
app.use(
    "/v1/anon",
    imageGetLimiter,
    LimitFailedRetries,
    express.static("files/anon", {
        maxAge: 1000 * 60,
        etag: true,
        index: false,
    }),
    // imageFailedGetLimiter,
    CountFailedRetries
);
app.all("*", (rq, rs) => {
    rs.status(404).send(`API end point not found!\nurl:${rq.url}`);
});
// SETUP server
setUp().then((_) => {
    // Start the server and listen for connections on the specified port
    app.listen(process.env.NODE_PORT, () => {
        console.log(`Server is listening on port ${process.env.NODE_PORT}`);
    });
});
