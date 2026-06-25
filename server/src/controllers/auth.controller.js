const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sessionModel = require("../models/session.model");

// === 1. REGISTER USER ===
async function registerUser(req, res) {
  const { name, email, password, avatar } = req.body;
  try {
    const data = await User.findOne({ email });
    if (data) {
      return res.status(401).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      avatar,
    });

    const session = await sessionModel.create({
      user: user._id,
      refreshTokenHash: "temp",
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    const refreshToken = jwt.sign(
      { user: user._id, sessionId: session._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    const hashRefreshToken = await bcrypt.hash(refreshToken, 10);

    session.refreshTokenHash = hashRefreshToken;
    await session.save();

    const accessToken = jwt.sign(
      { user: user._id, sessionId: session._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user,
      token: accessToken,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// === 2. LOGIN USER ===
async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Fill all required fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const session = await sessionModel.create({
      user: user._id,
      refreshTokenHash: "temp",
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    const refreshToken = jwt.sign(
      { user: user._id, sessionId: session._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    const hashRefreshToken = await bcrypt.hash(refreshToken, 10);
    session.refreshTokenHash = hashRefreshToken;
    await session.save();

    const accessToken = jwt.sign(
      { user: user._id, sessionId: session._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User login successfully",
      user,
      token: accessToken,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// === 3. GET USER ===
async function getUser(req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access Denied: No token provided" });
    }
    const token = authHeader.split(" ")[1];

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode.user) {
      return res.status(403).json({ message: "Invalid Token!" });
    }

    const session = await sessionModel.findById(decode.sessionId);
    if (!session || session.revoked) {
      return res.status(401).json({ message: "Session expired or logged out" });
    }

    const user = await User.findById(decode.user);
    return res.status(200).json({
      message: "User fetched successfully",
      token: token,
      user: user,
    });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized or token expired" });
  }
}

// === 4. REFRESH TOKENS ===
async function generateNewTokens(req, res) {
  try {
    const currentRefreshToken = req.cookies.refreshToken;
    if (!currentRefreshToken) {
      return res.status(401).json({ message: "Refresh token missing" });
    }

    const decoded = jwt.verify(currentRefreshToken, process.env.JWT_SECRET);
    const userId = decoded.user;
    const sessionId = decoded.sessionId;

    const session = await sessionModel.findOne({
      _id: sessionId,
      user: userId,
      revoked: false,
    });
    if (!session) {
      return res.status(401).json({ message: "Session not found or revoked" });
    }

    const isTokenValid = await bcrypt.compare(
      currentRefreshToken,
      session.refreshTokenHash,
    );
    if (!isTokenValid) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newRefreshToken = jwt.sign(
      { user: userId, sessionId: session._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    const newAccessToken = jwt.sign(
      { user: userId, sessionId: session._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );

    const hashedNewRefreshToken = await bcrypt.hash(newRefreshToken, 10);
    session.refreshTokenHash = hashedNewRefreshToken;
    await session.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Tokens refreshed successfully",
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }
}

// === 5. LOGOUT CURRENT DEVICE ONLY (Single Device) ===
async function logoutCurrentDevice(req, res) {
  try {
    const currentRefreshToken = req.cookies.refreshToken;
    if (!currentRefreshToken) {
      return res.status(401).json({ message: "Refresh token missing" });
    }

    const decoded = jwt.verify(currentRefreshToken, process.env.JWT_SECRET);
    console.log(decoded);

    await sessionModel.findOneAndUpdate(
      { _id: decoded.sessionId, user: decoded.user },
      { revoked: true },
    );

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ message: "Logged out from current device successfully" });
  } catch (error) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  }
}

// === 6. LOGOUT ALL DEVICES ===
async function logoutAll(req, res) {
  try {
    const currentRefreshToken = req.cookies.refreshToken;
    if (!currentRefreshToken) {
      return res.status(401).json({ message: "Refresh token missing" });
    }

    const decoded = jwt.verify(currentRefreshToken, process.env.JWT_SECRET);
    const userId = decoded.user;

    await sessionModel.updateMany(
      { user: userId, revoked: false },
      { revoked: true },
    );

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ message: "Logged out from all devices successfully" });
  } catch (error) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  }
}

// === 7. UPDATE USER ===
async function updateUser(req, res) {
  const { id, name, bio,avatar } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User ID is required in request body!" });
  }

  try {
    // ✅ Sahi Tareeqa (Removed backticks from User)
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, bio,avatar },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found !" });
    }

    return res.status(200).json({
      message: "User Update successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ message: "Database Error: " + error.message });
  }
}

module.exports = {
  registerUser,
  getUser,
  loginUser,
  generateNewTokens,
  logoutCurrentDevice,
  logoutAll,
  updateUser
};
