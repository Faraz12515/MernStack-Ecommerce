const express = require("express");
const router = express.Router();

const { signup, signin } = require("../controllers/user");
const { userSignupValidator } = require("../validator"); //validation middleware

router.post("/signup", userSignupValidator, signup);
router.post("/signin", userSignupValidator, signin);

module.exports = router;
