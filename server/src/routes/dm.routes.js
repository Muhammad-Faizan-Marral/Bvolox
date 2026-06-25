const dmController = require("../controllers/dm.controller");

const express = require("express");
const { verifyToken } = require("../middleware/auth.middleware");
const dmRouter = express.Router();

dmRouter.get("/conversation/:UserId", verifyToken ,dmController.getOrCreateConversation);
dmRouter.post("/conversationHistory", verifyToken ,dmController.conversationHistory);


module.exports = dmRouter;
