const express = require("express");
const FriendShip = require("../models/friendship");
const router = express.Router();
const FriendshipController = require("../controllers/add_friend_controller");


router.post("/friend/:id",FriendshipController.addFriend);


module.exports = router;
