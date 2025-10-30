import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

router.post("/analyze", async (req, res) => {
  const { tracks, artists } = req.body;
  
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Analyze this Spotify user's taste in music.
    Be funny, brutally honest, and savage — but not offensive.
    Use creative humor, sarcasm, and cultural references.

    Top Artists:
    ${artists.map(a => a.name).join(", ")}

    Top Tracks:
    ${tracks.map(t => t.name + " by " + t.artists[0].name).join(", ")}
    `;

    const result = await model.generateContent(prompt);
    const roast = result.response.text();

    res.json({ roast });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "AI generation failed" });
  }
});

export default router;
