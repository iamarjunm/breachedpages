import React, { useEffect, useState } from "react";

const messages = [
  "HELLO, STRANGER. ARE YOU READY?",
  "YOU ARE NOT ALONE.",
  "DO NOT REFRESH AGAIN. THEY ARE LISTENING.",
  "██████████████████████",
  "SO YOU THINK THIS IS A GAME? [CITY_NAME] IS A NICE PLACE.",
  "██████████████████████",
  "THE ANSWER WAS NEVER HERE. LOOK BACK AT WHAT YOU MISSED.",
  "FINAL TRANSMISSION RECEIVED. PREPARE TO RESET.",
  "SYSTEM CORRUPTION DETECTED.",
  "THEY ARE WATCHING THROUGH THE SCREEN.",
  "DON'T TRUST THE MESSAGES.",
  "YOUR LOCATION HAS BEEN COMPROMISED.",
  "THE SIGNAL IS GETTING WEAKER.",
  "IT'S TOO LATE TO TURN BACK NOW.",
  "THE CODE IS NOT WHAT IT SEEMS.",
  "THEY KNOW YOU'RE READING THIS."
];

const hiddenPhrase = "THEREISNOWAY"; // Letters to reveal
const startReveal = 10; // Letters start appearing from 10th refresh
const fullReveal = startReveal + hiddenPhrase.length; // Would be 30, but we'll prevent full reveal

const getRandomCity = () => {
  const cities = ["JAIPUR"];
  return cities[Math.floor(Math.random() * cities.length)];
};

const getDistortionEffect = () => {
  const effects = ["blur-sm", "grayscale", "opacity-50", "text-red-600", "text-white"];
  return effects[Math.floor(Math.random() * effects.length)];
};

const getRandomCorner = () => {
  const positions = [
    "top-4 left-4",
    "top-4 right-4",
    "bottom-4 left-4",
    "bottom-4 right-4",
    "top-1/3 right-1/4",
    "bottom-1/3 left-1/4"
  ];
  return positions[Math.floor(Math.random() * positions.length)];
};

const DivineStatic = () => {
  const [reloadCount, setReloadCount] = useState(() => {
    return parseInt(localStorage.getItem("reloadCount")) || 0;
  });

  const [city, setCity] = useState("");
  const [revealedLetter, setRevealedLetter] = useState(null);
  const [letterPosition, setLetterPosition] = useState("");
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const newCount = reloadCount + 1;
    localStorage.setItem("reloadCount", newCount % 30); // Reset count at 30 to prevent full reveal
    setReloadCount(newCount % 30);

    if (newCount % 5 === 0) {
      setCity(getRandomCity());
    }

    // Cycle through messages
    setCurrentMessageIndex(newCount % messages.length);

    // Show random letters between refresh 10-29 (never reaches 30)
    if (newCount % 30 >= startReveal && newCount % 30 < 30) {
      const letterIndex = (newCount % 30) - startReveal;
      if (letterIndex < hiddenPhrase.length) {
        setRevealedLetter(hiddenPhrase[letterIndex]);
        setLetterPosition(getRandomCorner());
      } else {
        setRevealedLetter(null);
      }
    } else {
      setRevealedLetter(null);
    }
  }, []);

  const currentMessage = messages[currentMessageIndex].replace("[CITY_NAME]", city);

  return (
    <div className="h-screen bg-black text-white flex flex-col justify-center items-center relative overflow-hidden">
      {/* Hidden Link (invisible but cursor changes when hovering) */}
      <a 
        href="https://www.google.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute top-1/2 left-1/4 w-8 h-8 opacity-0 hover:opacity-0 cursor-pointer"
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      {/* Glitching background text */}
      <div className="absolute text-red-700 text-8xl font-bold opacity-10 select-none animate-glitch">
        {currentMessage}
      </div>

      {/* Main Message */}
      <h1 className={`text-3xl md:text-4xl font-bold transition-all duration-500 ${getDistortionEffect()} glitch`}>
        {currentMessage}
      </h1>

      {/* Hidden Letter in a Random Corner */}
      {revealedLetter && (
        <span
          className={`absolute text-red-600 text-xl font-bold opacity-10 hover:opacity-90 transition-all duration-500 glitch ${letterPosition} animate-flicker`}
        >
          {revealedLetter}
        </span>
      )}

      {/* Flickering Overlay */}
      <div className="absolute inset-0 bg-black opacity-30 animate-flicker"></div>

      {/* Creepy Cursor */}
      <div className="absolute w-3 h-3 bg-red-600 rounded-full pointer-events-none animate-pulse cursor-dot"></div>
    </div>
  );
};

export default DivineStatic;