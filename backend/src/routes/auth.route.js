import express from "express";
import { checkAuth, deleteProfile, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/dang-ky", signup);
router.post("/dang-nhap", login);
router.post("/dang-xuat", logout);

router.put("/cap-nhat-profile", protectRoute, updateProfile);
router.delete("/xoa-profile", protectRoute, deleteProfile);

router.get("/kiem-tra", protectRoute, checkAuth);

export default router;