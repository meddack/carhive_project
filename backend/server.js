  const express = require("express");
  const mongoose = require("mongoose");
  const cors = require("cors");
  const app = express();

  app.use(cors());
  app.use(express.json());

  mongoose.connect("mongodb://127.0.0.1:27017/carhive", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

  const bookingRoutes = require("./routes/bookings");
  const expenseRoutes = require("./routes/expenses");
  const carRoutes = require("./routes/cars");
  const dashboardRoute = require("./routes/dashboard");
  app.use("/api/dashboard", dashboardRoute);
  app.use("/api/cars", carRoutes);
  app.use("/api/bookings", bookingRoutes);
  app.use("/api/expenses", expenseRoutes);

  const PORT = 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
