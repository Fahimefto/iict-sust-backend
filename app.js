require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

//path
app.get("/", (req, res) => {
  res.json({ message: "Server Running" });
});

app.listen(process.env.PORT, () =>
  console.log("listening at " + process.env.PORT)
);
