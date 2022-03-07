const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database Connection Successful"))
  .catch((err) => console.log(err));

app.use("/api", userRoutes);
app.use("/api", authRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening to the port ${port}`);
});
