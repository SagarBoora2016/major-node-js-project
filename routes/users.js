const express = require("express");
const router = express.Router();

const userController = require("../controllers/user_controller");
console.log("cleed");
router.get("/profile",userController.profile);

router.get("/sign-up",userController.signUp);
router.get("/sign-in",userController.signIn);
router.post("/create",userController.create);
module.exports = router;