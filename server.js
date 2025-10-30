import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import spotifyRoutes from "./routes/spotify.js";
import aiRoutes from "./routes/ai.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/ai", aiRoutes);

app.use("/auth", authRoutes);
app.use("/spotify", spotifyRoutes);

app.get("/", (req, res) => {
  res.send("🎵 Obscure Music Judge backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
