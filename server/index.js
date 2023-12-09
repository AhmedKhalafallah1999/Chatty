import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import "express-async-errors";
import cookieParser from "cookie-parser";
import cors from "cors";
import test from "./routes/test.js";
import auth from "./routes/auth.js";
// re-factoring the created server way
import { createServer } from "http";
import { NotFoundError } from "./errors/customError.js";
// importing socket.io for real communications
import { Server } from "socket.io";
const app = express();
const httpServer = createServer(app);

dotenv.config();
app.use(cors());

app.use(express.json());
app.use(cookieParser());
// auth middleware
app.use("/api/v1/auth", auth);
// test Router
app.use("/api/v1", test);

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
// create an io server and allow localhost
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
// listen for a user is connected via socket.io-client
io.on("connection", (socket) => {
  console.log(`User Connected ${socket.id}`);

  socket.on("send-msg", (msg) => {
    console.log(`${msg} from ${socket.id}`);

    io.emit("recieve-msg", { msg });
  });
  // socket.emit("recieve-msg", { msg: "hi" });

  // socket.emit("recieve-msg", {
  //   msg: "Welcom our new visitor",
  // });
});
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connection successful");
    httpServer.listen(process.env.PORT, () => {
      console.log(`app is connected on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err.messag));
