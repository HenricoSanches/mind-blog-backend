import express from "express";
import cors from "cors";

import {
  authRoutes,
  postRoutes,
  userRoutes,
  commentRoutes,
} from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/comments", commentRoutes); // 👈 mantém plural na URL (CORRETO)

app.use("/uploads", express.static("uploads"));

export default app;
