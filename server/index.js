import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
// import cors from "cors";
import test from "./routes/test.js";
import auth from "./routes/auth.js";
import { NotFoundError } from "./errors/customError.js";
const app = express();
dotenv.config();
// app.use(cors());

app.use(express.json());
// test Router
app.use("/api/v1", test);
// auth middleware
app.use("/api/v1/auth", auth);
// Not found middleware
app.use("*", (req, res) => {
  // res.status(StatusCodes.NOT_FOUND).json({ msg: "Not found middleware" });
  throw new NotFoundError("Not found middleware");
});
// error middleware
app.use("*", (err, req, res, next) => {
  res.status(err.StatusCodes).json({ msg: err.message });
  // console.log(err);
});

// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("DB Connection successful");
//   })
//   .catch((err) => console.log(err.messag));
app.listen(process.env.PORT, () => {
  console.log(`app is connected on port ${process.env.PORT}`);
});
