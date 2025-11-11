import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import busRoutes from "./routes/busRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// serve frontend static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "..", "frontend")));

// API routes under /api
app.use("/api", busRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚍 Bus Pay System PRO - backend running on http://localhost:${PORT}`);
});
