import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { name, email, avatar, phoneNumber } = req.body;

    let user = await User.findOne({ email });

    // If new user → create
    if (!user) {
      const newUser = new User({
        name,
        email,
        avatar,
        phoneNumber,
      });
      await newUser.save();
      user = newUser;
    }

    // Convert user object
    const userObj = user.toObject({ getters: true });

    // Sign JWT
    const token = jwt.sign(
      { id: userObj._id, email: userObj.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: false,   // ✅ for localhost, set true in prod
      sameSite: "lax",
    });

    // Send success
    return res.status(200).json({
      success: true,
      user: userObj,
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export default login;
