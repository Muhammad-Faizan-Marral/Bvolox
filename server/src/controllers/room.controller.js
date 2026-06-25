const Room = require("../models/room.model");
const RoomMessage = require("../models/roomMessage.model");

// 1. Create Room
async function createRoom(req, res) {
  try {
    const room = await Room.create({
      name: req.body.name,
      description: req.body.description,
      createdBy: req.user._id,
      members: [req.user._id], // Creator khud pehla member hota hai
    });
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// 2. Get All Rooms
async function getRooms(req, res) {
  try {
    const rooms = await Room.find()
      .populate("createdBy", "name profileImage")
      .sort({ createdAt: -1 });

    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// 3. Join Room (CRITICAL FIX HERE)
async function joinRoom(req, res) {
  try {
    const room = await Room.findById(req.params.roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // FIX: Mongoose IDs ko compare karne ke liye .equals() use karna zaroori hai
    const isAlreadyMember = room.members.some(memberId => 
      memberId.equals(req.user._id)
    );

    if (!isAlreadyMember) {
      room.members.push(req.user._id);
      await room.save();
    }

    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// 4. Get Room Messages
async function getRoomMessages(req, res) {
  try {
    const messages = await RoomMessage.find({ roomId: req.params.roomId })
      .populate("sender", "name avatar")
      .sort({ createdAt: 1 }); // Timestamps are now added to schema

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { createRoom, getRooms, joinRoom, getRoomMessages };