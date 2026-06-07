import mongoose from "mongoose";

const expense = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 100,
    },
    category: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const expenseModel = mongoose.model("expense", expense);
export default expenseModel;
