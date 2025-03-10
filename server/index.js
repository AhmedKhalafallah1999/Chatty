import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import "express-async-errors";
import cookieParser from "cookie-parser";
import cors from "cors";
import test from "./routes/test.js";
import feed from "./routes/feed.js";
import auth from "./routes/auth.js";
// re-factoring the created server way
import { createServer } from "http";
import { NotFoundError } from "./errors/customError.js";
// importing socket.io for real communications
import { Server } from "socket.io";
import message from "./models/message.js";
import user from "./models/user.js";
import room from "./routes/room.js";
import roomMsg from "./models/roomMsg.js";
// public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const httpServer = createServer(app);

dotenv.config();
app.use(cors());
// public
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "./public")));

app.use(express.json());
app.use(cookieParser());
// auth middleware
app.use("/api/v1/auth", auth);
// users routes
app.use("/api/v1/feed", feed);
// room routes
app.use("/api/v1/room", room);
// test Router
app.use("/api/v1", test);

// create an io server and allow localhost
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// a map for record online and offline users
const userSocketMap = new Map();

io.on("connection", (socket) => {
  console.log(`User Connected with ${socket.id}`);
  // storing the user ids with their socket ids into map
  socket.on("associated-current-user", async (payload) => {
    userSocketMap.set(payload.currentUserId, socket.id);
    const User = await user.findOne({ _id: payload.currentUserId });
    if (User) {
      User.socketId = true;
      console.log("saved into");
      await User.save();
    }
  });
  // socket.emit("associated-current-user","Fuck")
  socket.on("test", (payload) => {
    console.log(payload);
  });
  // to handling user is typing notify
  socket.on("someone-is-typing", (payload) => {
    const myFriendSocketId = userSocketMap.get(payload.contactWith._id);
    console.log(payload);
    if (myFriendSocketId) {
      io.to(myFriendSocketId).emit("notify-is-typing", {
        msg: payload.msg,
        sender: payload.sender,
      });
    }
  });

  // chat together with some one
  socket.on("chatWith", async (payload) => {
    const myFriendSocketId = userSocketMap.get(payload.chatWithUserId);
    const Message = await message.create({
      // try to change the sender or test this or
      // send it by payload
      sender: payload.senderId,
      reciver: payload.chatWithUserId,
      message: payload.msg,
      // for future handling...
      // status: myFriendSocketId ? "delivered" : "sent",
    });
    // console.log(Message);
    await Message.save();
    // to sending the message to the myself like whatsapp
    io.to(socket.id).emit("recievePrivateMessage", {
      msg: Message,
    });

    if (myFriendSocketId) {
      // if found, send to my friend
      io.to(myFriendSocketId).emit("recievePrivateMessage", {
        msg: Message,
      });
      io.to(myFriendSocketId).emit("notify-msg", {
        myUserId: payload.senderId,
        myFriendUserId: payload.chatWithUserId,
      });
    } else {
      io.to(socket.id).emit("notify-is-offline", {
        msg: "is offline now, you can send as soon as be available, you can take a response",
      });
    }
  });
  // for Handle message seen (read receipts) in future

  // for room handling  =>

  socket.on("notify-someone-join", (payload) => {
    socket.join(payload.roomId);
    io.to(payload.roomId).emit("notify-someone-join-msg", {
      msg: payload.msg,
    });
  });
  socket.on("roomWith", async (payload) => {
    const RoomMessage = await roomMsg.create({
      sender: payload.currentUserId,
      reciver: payload.chatWithRoomId,
      message: payload.msg,
    });
    io.to(payload.chatWithRoomId).emit("recieveRoomPrivateMessage", {
      msg: RoomMessage,
    });
  });
  socket.on("notify-someone-leave", (payload) => {
    io.to(payload.roomId).emit("notify-someone-leave-msg", {
      msg: payload.msg,
    });
  });

  socket.on("disconnect", async () => {
    // Find and delete the user entry from the map
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        const User = await user.findOne({ _id: userId });
        User.socketId = false;
        await User.save();
        userSocketMap.delete(userId);
        break;
      }
    }
  });
});
// Not found middleware
app.use("*", (req, res) => {
  // res.status(StatusCodes.NOT_FOUND).json({ msg: "Not found middleware" });
  throw new NotFoundError("Not found middleware");
});

// error middleware
app.use("*", (err, req, res, next) => {
  res.status(err.StatusCodes || 500).json({ msg: err.message });
  // console.log(err);
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
