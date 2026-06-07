import router from "../routes/expenseRoute.js";
import expenseModel from "../models/expenseModel.js";

//add expense
export const addExpense = async (req, res) => {
  try {
    const { userId, title, amount, category, description, date } = req.body;
    if (!userId || !title || !amount || !category || !date) {
      return res.status(400).json({ message: "please fill all the fields.." });
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
export const getExpense = async (req, res) => {
  try {
    const { userId, title, amount, category, description, date } = req.body;
    if (!userId || !title || !amount || !category || !date) {
      res.status(200).json({ message: "getting data successfully" });
    } else {
      const userData = await expenseModel.find({ userId: req.user._id });
      res
        .status(200)
        .json({ user: ref.user._id, title, amount, category, description });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//update expense
export const updateExpense = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;
    const userupdate = await expenseModel.findOne({ userId });
    if (!userId) {
      res.status(200).json({ message: "user Details updated successfully.." });
    } else {
      res.status(404).json({ message: "user not found.." });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//delete expense
export const deleteExpense = async (req, res) => {
  try {
    const { userId } = req.body;
    const deleteUser = userId.filter({ userId: req.user._id ? "userId" : "" });
    res.status(200).json({ message: "user details deleteds successfully.." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//search expenses
export const searchExpenses = async (req, res) => {};

//filter expenses
export const filterExpenses = async (req, res) => {};
