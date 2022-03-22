const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const appointmentRoutes = require("./routes/appointment");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database Connection Successful"))
  .catch((err) => console.log(err));


   //api/categoriies
   //api/subscription
app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", appointmentRoutes);

const swaggerOptions = {
  swaggerDefinition: {
    components: {},
    info: {
      version: "1.0.0",
      title: "Appointment API",
      descritption: "Appointment API information",
      contact: {
        name: "Sarin Bhattarai",
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
  },
  apis: [
    "./routes/user.js",
    "./routes/category.js",
    "./routes/auth.js",
    "./routes/appointment.js",
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("*", (req, res, next)=>{
  res.status(404).json({
    status: "fail",
    message: "APi not found"
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening to the port ${port}`);
});
