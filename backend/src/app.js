import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import sweetRoutes from "./routes/sweets.js";

const app = express();

app.use(
  cors({
    origin: "https://sweet-management-xqhj.vercel.app",
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

export default app;
