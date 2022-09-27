require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

//path
app.get("/", (req, res) => {
  res.json({ message: "Server Running " });
});

app.listen(process.env.PORT, async () => {
  console.log("listening at " + process.env.PORT);
  try {
    const con = await mongoose.connect(process.env.MONGO_URI_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `database connected  : ${con.connection.host} \ndatabase name : ${con.connection.name}`
    );
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
});
