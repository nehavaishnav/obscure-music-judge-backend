export const calculateObscurityScore = (tracks) => {
  let popularitySum = 0;
  tracks.forEach(track => {
    popularitySum += track.popularity;
  });

  const avgPopularity = popularitySum / tracks.length;
  const obscurity = 100 - avgPopularity; // invert

  let message;
  if (obscurity > 80) message = "Whoa, your taste is so underground it might need a flashlight 🔦";
  else if (obscurity > 60) message = "You're vibing with some hidden gems 💎";
  else if (obscurity > 40) message = "You’re balanced — a mix of hits and hidden treasures 🎧";
  else message = "Mainstream alert 🚨 You probably hum radio hits in your sleep!";

  return { score: Math.round(obscurity), message };
};
