require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const eventRoutes = require("./events/evRoutes");

const app = express();
app.use(express.json());

//routes || API

app.get("/", (req, res) => {
  res.json({ message: "Server Running " });
});
//event API
app.use("/api/events", eventRoutes);

//server & Database listening
app.listen(process.env.PORT, async () => {
  console.log("listening at " + process.env.PORT);
  try {
    //database connection url
    const con = await mongoose.connect(process.env.MONGO_URI_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `database connection host : ${con.connection.host} \ndatabase name : ${con.connection.name}`
    );
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
});
