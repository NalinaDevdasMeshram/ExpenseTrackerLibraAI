import router from "../routes/expenseRoute.js";
import expenseModel from "../models/expenseModel.js";
import userModel from "../models/userModel.js";

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
    const userId = req.user._id;
    console.log(userId);

    const expenses = await expenseModel.find({ userId });

    res
      .status(200)
      .json({ success: true, count: expenses.length, expense: expenses });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

//update expense
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updateExpense = await expenseModel.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updateExpense) {
      res.status(200).json({ success: false, message: "user not found" });
    }
    res.status(200).json({
      success: true,
      message: "user details updated successfully..",
      updateExpense,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

//delete expense
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await userModel.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });
    console.log(deleteUser);
    if (!deleteUser) {
      res.status(404).json({ success: false, message: "user not found.." });
    }
    res
      .status(200)
      .json({ success: true, message: "users details deleted successfully.." });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

//search expenses
export const searchExpenses = async (req, res) => {
  try {
    const { keyword } = req.query;

    const expenses = await expenseModel.find({
      userId: req.user._id,
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });

    res.status(200).json({
      success: true,
      expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//filter expenses
export const filterExpenses = async (req, res) => {
  try {
    const { category, startDate, endDate } = req.query;

    const filter = {
      userId: req.user._id,
    };

    if (category) {
      filter.category = category;
    }

    if (startDate || endDate) {
      filter.date = {};

      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }

      if (endDate) {
        filter.date.$lte = new Date(endDate);
      }
    }

    const expenses = await expenseModel.find(filter);

    res.status(200).json({
      success: true,
      expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
