const express = require("express");
const router = express.Router();

const userController = require("../controllers/user_controller");
console.log("cleed");
router.get("/profile",userController.profile);
module.exports = router;