import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import volunteerRoutes from "./routes/volunteer.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "NayePankh Volunteer Management API Running",
  });
});

export default app;