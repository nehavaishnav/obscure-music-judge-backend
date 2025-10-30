import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI,
  FRONTEND_URL
} = process.env;

router.get("/login", (req, res) => {
  const scope = "user-top-read";
  const redirect = `https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENT_ID}&scope=${scope}&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}`;
  res.redirect(redirect);
});

router.get("/callback", async (req, res) => {
  const code = req.query.code || null;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
    }),
  });

  const data = await response.json();
  res.redirect(`${FRONTEND_URL}/dashboard?access_token=${data.access_token}`);
});

export default router;
