const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection successful");
  })
  .catch((err) => console.log(err.messag));
app.listen(process.env.PORT, () => {
  console.log(`app is connected on port ${process.env.PORT}`);
});
