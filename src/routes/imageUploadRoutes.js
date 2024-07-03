const express = require("express");
const fileuploadController = require("../controllers/imageUploadController.js");
const router = express.Router();

// root url path
//   /va/anon/images/ 

// image upload route for anonymous users
router.route("/v1/anon/images/").post(fileuploadController.uploadImageAnon);

module.exports = router;
