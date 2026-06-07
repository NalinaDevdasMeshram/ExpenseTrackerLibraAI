import express from "express";
const router = express.Router();
import { dashboardData } from "../controllers/dashboardController.js";

router.get("/", dashboardData);

export default router;
