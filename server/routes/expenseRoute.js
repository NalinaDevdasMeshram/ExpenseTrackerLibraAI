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
router.get("/get", getExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);
router.get("/search", searchExpenses);
router.get("/filter", filterExpenses);

export default router;
