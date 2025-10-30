import express from "express";
import fetch from "node-fetch";
import { calculateObscurityScore } from "../utils/scoreCalculator.js";

const router = express.Router();

router.get("/top-tracks", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No access token provided" });

  const response = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=10", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  if (!data.items) return res.status(400).json({ error: "Failed to fetch tracks" });

  const score = calculateObscurityScore(data.items);
  res.json({ tracks: data.items, score });
});

export default router;
