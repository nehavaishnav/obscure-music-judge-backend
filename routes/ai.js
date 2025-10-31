import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY, { apiVersion: 'v1' });
router.post("/analyze", async (req, res) => {
  try {
    console.log("🟢 /ai/analyze route hit!");
    console.log("📦 req.body =", req.body);

    const { songs } = req.body || {};
    if (!songs || !Array.isArray(songs)) {
      console.log("❌ songs is missing or not an array");
      return res.status(400).json({ error: "songs must be an array" });
    }

    const prompt = `
You're a savage indian critic that has social media humour and is dank
Analyze this user's music taste from these songs:
${songs.join(", ")}.

Give a clever, brutally honest, and entertaining roast  but in short words in 150 words only also use hignlish and desi slangs 
`;

    console.log("⚡ Sending request to Gemini...");

    // ✅ Use correct model name and method
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    console.log("✅ Gemini Response:", text);
    res.json({ text });
  } catch (error) {
    console.error("🔥 Caught error:", error);
    res.status(500).json({
      text: "Couldn't generate analysis 😬",
      error: error.message,
    });
  }
});

export default router;
