const roomController = require("../controllers/room.controller");

const express = require("express");
const { verifyToken } = require("../middleware/auth.middleware");
const roomRouter = express.Router();


roomRouter.post("/", verifyToken, roomController.createRoom);

roomRouter.get("/", verifyToken, roomController.getRooms);

roomRouter.post("/join/:roomId", verifyToken, roomController.joinRoom);

roomRouter.get("/messages/:roomId", verifyToken, roomController.getRoomMessages);
module.exports = roomRouter;
