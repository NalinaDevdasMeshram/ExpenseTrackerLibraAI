import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

//register controller
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "user already exist" });
    }

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!name || !email || !password) {
      return res.status(400).json({ message: "please fill all the fields" });
    } else {
      res.status(200).json({ message: "user registered successfully.." });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const ispasswordCorrect = await bcrypt.compare(password, user.password);
    if (!ispasswordCorrect) {
      return res.status(400).json({ message: "invalid credentials." });
    }
    const token = generateToken(user._id);

    res.status(200).json({ message: "user logged in successfully..", token });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
