import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../middleware/error.middleware";
import User from "../models/user.model";
import { UserResponse } from "../types/user";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new AppError(
        "User already exists with this email or username",
        400
      );
    }

    const user = await User.create({ username, email, password });

    const userResponse: UserResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("Error registering user", 500);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    const userResponse: UserResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    res.json({
      message: "Login successful",
      token,
      user: userResponse,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("Error during login", 500);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const userResponse: UserResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    res.json(userResponse);
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("Error fetching user", 500);
  }
};
