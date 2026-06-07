import router from "../routes/expenseRoute.js";
import expenseModel from "../models/expenseModel.js";

//add expense
export const addExpense = async (req, res) => {
  try {
    const { userId, title, amount, category, description, date } = req.body;
    if (!userId || !title || !amount || !category || !date) {
      return res.status(400).json({ message: "please fill all the fields" });
    } else {
      const expense = await expenseModel.create({
        userId: req.user._id,
        title,
        amount,
        category,
        description,
        date,
      });
      res
        .status(200)
        .json({ message: "expense added successfully..", expense });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//get expenses
export const getExpense = async (req, res) => {};

//update expense
export const updateExpense = async (req, res) => {};

//delete expense
export const deleteExpense = async (req, res) => {};

//search expenses
export const searchExpenses = async (req, res) => {};

//filter expenses
export const filterExpenses = async (req, res) => {};
