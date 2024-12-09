import pkg from "bcryptjs";
const { hash, compare } = pkg;
import pkgg from "jsonwebtoken";
const { sign } = pkgg;
import User from "../model/user.Model.js";

export async function register(req, res) {
  try {
    const { name, email, password,role } = req.body;
    const hashedPassword = await hash(password, 10);
    const user = await User.create({ name, email,role, password: hashedPassword });

    const token = sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(201).json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Registration failed" });
  }
}

export async function login(req, res) {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ where: { email } });
  
      // Check if user exists and if the password matches
      if (!user || !(await compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      // Generate a JWT token
      const token = sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
  
      // Set the token in a cookie (optional) and return the response
      res
        .status(200)
        .cookie("token", token, { httpOnly: true, secure: true }) // Secure flag for HTTPS environments
        .json({ token, message: "Login successful" });
    } catch (error) {
      console.error("Login Error:", error); // Log the error for debugging
      res.status(500).json({ error: "Login failed" });
    }
  }
  
