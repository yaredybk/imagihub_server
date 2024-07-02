const express = require("express");
const fileuploadController = require("../controllers/imageUploadController.js");
const router = express.Router();

// root url path
//   /api/va/anon/images/ 

// image upload route for anonymous users
router.route("/api/v1/anon/images/").post(fileuploadController.uploadImageAnon);

module.exports = router;