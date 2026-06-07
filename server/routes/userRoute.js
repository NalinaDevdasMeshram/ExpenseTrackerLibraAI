import express from "express";
const router = express.Router();
import { register, login } from "../controllers/userController.js";
import { protect } from "../middleware/authencation.js";

router.post("/register", register);
router.post("/login", protect, login);

export default router;
