const userApi = require("../../../controllers/api/v1/user_api");
const express = require("express");
const router = express.Router();

router.post("/create-session",userApi.createSession);

module.exports = router;