const express = require("express");
const router = express.Router();
const homeColtroller = require("../controllers/home_controller");

router.get("/",homeColtroller.home);

router.use("/users",require("./users"));
router.use("/delete",require("./delete"));
router.use("/post",require("./post"));
router.use("/comment",require("./comment"));
router.use("/like",require("./like"));
router.use("/add",require("./add-friend.js"));

router.use("/api",require("./api"));

module.exports = router;