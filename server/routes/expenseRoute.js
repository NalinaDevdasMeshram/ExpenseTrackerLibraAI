import express from "express";
const router = express.Router();
import {
  addExpense,
  getExpense,
  updateExpense,
  deleteExpense,
  searchExpenses,
  filterExpenses,
} from "../controllers/expenseController.js";
import { protect } from "../middleware/authencation.js";

router.post("/add", protect, addExpense);
router.get("/get", protect, getExpense);
router.put("/:id", protect, updateExpense);
router.delete("/:id", protect, deleteExpense);
router.get("/search", protect, searchExpenses);
router.get("/filter", protect, filterExpenses);

export default router;
