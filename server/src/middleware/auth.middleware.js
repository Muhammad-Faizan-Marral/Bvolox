const jwt = require("jsonwebtoken");
const sessionModel = require("../models/session.model");
const User = require("../models/user.model");

async function verifyToken(req, res, next) {
  try {
    // 1. Authorization header se Access Token nikalo
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Access Denied: No token provided" });
    }
    const token = authHeader.split(" ")[1];

    // 2. Token ko verify aur decode karo
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode.user) {
      return res.status(403).json({ success: false, message: "Invalid Token!" });
    }

    // 3. Check karo kya yeh session database me active hai ya nahi
    const session = await sessionModel.findById(decode.sessionId);
    if (!session || session.revoked) {
      return res.status(401).json({ success: false, message: "Session expired or logged out" });
    }

    // 4. User ko database se dhoondo (Taki password secure rahe aur baki data mil jaye)
    const user = await User.findById(decode.user).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 🔥 Sabse Important Step: req.user me user ka data aur req.session me session set kar do
    // Is wajah se tumhare saare controllers ko req.user._id mil payegi
    req.user = user;
    req.sessionInfo = session; 

    // Agale function/controller par chalay jao
    next();

  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    
    // Agar token expire ho chuka hai to frontend ko specific string bhejien taake wo refresh token hit kare
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "jwt expired" });
    }
    
    return res.status(401).json({ success: false, message: "Unauthorized or token expired" });
  }
}

module.exports = { verifyToken };