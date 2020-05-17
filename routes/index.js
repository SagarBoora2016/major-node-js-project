const express = require("express");
const router = express.Router();
const homeColtroller = require("../controllers/home_controller");

console.log("Router Called");

router.get("/",homeColtroller.home);
router.use("/users",require("./users"));
router.use("/delete",require("./delete"));
router.use("/post",require("./post"));


module.exports = router;