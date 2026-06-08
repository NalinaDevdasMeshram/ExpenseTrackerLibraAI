import express from "express";
const app = express();
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
import router from "./routes/userRoute.js";
import userRoute from "./routes/userRoute.js";
import expenseRoute from "./routes/expenseRoute.js";
import dashboardRoute from "./routes/dashboard.js";

//connect to the database
connectDB();

//middleware
app.use(express.json());

//routes
app.use("/api/auth/", userRoute);
app.use("/api/expenses/", expenseRoute);
app.use("/api/dashboard/", dashboardRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
