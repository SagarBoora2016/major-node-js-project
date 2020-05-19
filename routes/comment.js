const express = require("express");
const commentController = require("../controllers/comment_controller");
const router = express.Router();
const passport = require("passport");

router.post("/create",passport.checkAuthentication,commentController.create);
router.get("/delete",passport.checkAuthentication,commentController.destroy);
module.exports = router;