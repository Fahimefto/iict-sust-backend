require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const eventRoutes = require("./events/evRoutes");
const staffRoutes = require("./stuffs/sRoutes") ;
const noticesRoutes = require("./notices/noticesRoutes") ;

const app = express();
app.use(express.json());

//routes || API

app.get("/", (req, res) => {
  res.json({ message: "Server Running " });
});
//APIs
app.use("/api/events", eventRoutes);
app.use("/api/staffs" , staffRoutes);
app.use("/api/notices" , noticesRoutes);

//server & Database listening
app.listen(process.env.PORT, async () => {
  console.log("listening at " + process.env.PORT);
  try {
    //database connection url
    const con = await mongoose.connect(process.env.MONGO_URI, {
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
