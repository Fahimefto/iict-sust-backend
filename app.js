require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const eventRoutes = require("./events/evRoutes");
const noticesRoutes = require("./notices/noticesRoutes");
const staffRoutes = require("./stuffs/sRoutes");
const batchRoutes = require("./batch/bRoutes");
const upEventRoutes = require("./upcommingEvents/upRoutes");
const conRoutes = require("./contact/conRoutes");
const programsRoutes = require("./programs/progRoutes");
const researchRoutes = require("./research/rRoutes");
const authRoutes = require("./auth/authRoutes");
const facultyRoutes = require("./faculty/facultyRoutes");
const achievementRoutes = require("./achievement/achievementRoutes");
const directorRoutes = require("./history/historyRoutes");
const alumniRoutes = require("./alumni/alumniRoutes");
const industryRoutes = require("./industry_collab/industryRoutes");

const app = express();
app.use(express.json());
app.use(cookieParser());

//routes || API

app.get("/", (req, res) => {
  res.json({ message: "Server Running " });
});
// API's
app.use("/api/events", eventRoutes);
app.use("/api/staffs", staffRoutes);
app.use("/api/batchs", batchRoutes);
app.use("/api/up-events", upEventRoutes);
app.use("/api/notices", noticesRoutes);
app.use("/api/programs", programsRoutes);
app.use("/api/researchs", researchRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/directors", directorRoutes);
app.use("/api/alumni",alumniRoutes);
app.use("/api/industry",industryRoutes);

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
