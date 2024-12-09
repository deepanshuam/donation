import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import userRouter from "./routes/user.Routes.js";
import profileRouter from "./routes/profile.Routes.js"
import charityRouter from "./routes/charity.Routes.js"

import donationRouter from "./routes/donation.Routes.js"

import adminRouter from "./routes/admin.Routes.js"
const app = express();
app.use(cors());
// setup to access the permission of the cors

// app.use((req, res, next) => {
//     console.log('Incoming request:', req.body, req.file);
//     next();
//   });

// configuration
app.use(express.json({ limit: "30kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// To acess and set the user server cookies.
app.use(cookieParser());

//routes path define
app.use("/api/v1/user", userRouter);
app.use("/api/v1/profile",profileRouter);
app.use("/api/v1/charity",charityRouter);

app.use("/api/v1/donation",donationRouter);

app.use("/api/v1/admin",adminRouter);
export { app };
