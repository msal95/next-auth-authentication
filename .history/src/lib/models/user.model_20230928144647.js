import mongoose, { models } from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full Name is Required"],
    trim: true,
  },
  userName: {
    type: String,
    required: [true, "Username is Required"],
    unique: [true, "Username is already Exist"],
    min: [4, "Minimum 4 characters are required."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: [true, "Email is already Exist"],
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email address");
      }
    },
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    min: [4, "Minimum 4 characters are required."],
  },
  roles: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = models.User || mongoose.model("User", userSchema);

export default User;
