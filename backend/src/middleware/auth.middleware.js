import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({message: "Không tìm thấy token, chưa xác thực được tài khoản"})
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if(!decoded) {
        return res.status(401).json({message: "Không tìm thấy token, chưa xác thực được tài khoản"})
    }
    const user = await User.findById(decoded.userId).select("-password")
    if(!user) {
        return res.status(404).json({message: "Không tìm tài khoản"})

    }
    req.user = user 
    next()
  } catch (error) {
    console.log(error.message)
  }
};
