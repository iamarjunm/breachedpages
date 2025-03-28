import { useEffect, useState } from "react";

export default function SilentHorror() {
  const [failed, setFailed] = useState(false);
  const [showWhisper, setShowWhisper] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [flicker, setFlicker] = useState(false);
  const [whisperGlitch, setWhisperGlitch] = useState(false);

  useEffect(() => {
    if (failed) return;

    const whisperTimeout = setTimeout(() => setShowWhisper(true), 45000);
    const glitchInterval = setInterval(() => setGlitch((g) => !g), Math.random() * 3000 + 1000);
    const flickerInterval = setInterval(() => setFlicker((f) => !f), Math.random() * 5000 + 3000);
    const whisperGlitchInterval = setInterval(() => setWhisperGlitch((w) => !w), Math.random() * 500 + 200);

    return () => {
      clearTimeout(whisperTimeout);
      clearInterval(glitchInterval);
      clearInterval(flickerInterval);
      clearInterval(whisperGlitchInterval);
    };
  }, [failed]);

  const noiseDetected = () => {
    if (!failed) {
      setFailed(true);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", noiseDetected);
    window.addEventListener("keydown", noiseDetected);
    window.addEventListener("click", noiseDetected);

    return () => {
      window.removeEventListener("mousemove", noiseDetected);
      window.removeEventListener("keydown", noiseDetected);
      window.removeEventListener("click", noiseDetected);
    };
  }, [failed]);

  return (
    <div className={`relative h-screen w-screen bg-black overflow-hidden ${failed ? "death" : ""}`}>
      {/* Background Glitch Overlay */}
      <div className={`absolute inset-0 bg-noise opacity-30 pointer-events-none ${glitch ? "glitch-effect" : ""}`}></div>

      {/* Whisper Word with Multiversal Glitch Effect */}
      {showWhisper && !failed && (
        <div
          className={`absolute text-6xl font-bold opacity-50 transition-all duration-75 glitch-text ${
            flicker ? "hidden" : ""
          }`}
          style={{
            left: `${Math.random() * 80 + 10}%`, // Random position shifts
            top: `${Math.random() * 80 + 10}%`,
            transform: `translate(-50%, -50%) scale(${Math.random() * 1.5 + 0.5}) rotate(${Math.random() * 20 - 10}deg)`,
            textShadow: whisperGlitch
              ? "4px 4px 10px red, -4px -4px 10px blue"
              : "2px 2px 5px cyan, -2px -2px 5px magenta",
            color: whisperGlitch ? "rgba(255, 255, 255, 0.8)" : "rgba(200, 200, 200, 0.6)",
          }}
        >
          W̵̛̞̰̕͝H̷̩̅I̷̤̻͠͝S̵̱͊̈́ͅP̵̘̅̑Ë̸̠́̄͜Ṙ̷͙͌
        </div>
      )}

      {/* Death Effect */}
      {failed && (
        <div className="absolute inset-0 bg-red-900 flex items-center justify-center transition-all duration-500"></div>
      )}

      {!failed && (
        <>
          {/* Random "No-Use" Clickable Text */}
          <div className="absolute top-20 left-40 text-gray-500 text-sm cursor-pointer glitch-text">
            SYSTEM ERROR: 404
          </div>
          <div className="absolute bottom-32 right-20 text-gray-500 text-sm cursor-pointer glitch-text">
            UNSTABLE REALITY DETECTED
          </div>
          <div className="absolute top-1/3 left-1/4 text-gray-500 text-sm cursor-pointer glitch-text">
            [TRANSMISSION LOST]
          </div>

          {/* Main Buttons */}
          <button className="absolute top-10 left-10 bg-gray-800 text-white px-4 py-2 rounded glitch">
            SYSTEM REBOOT
          </button>
          <button className="absolute bottom-10 right-10 bg-gray-800 text-white px-4 py-2 rounded glitch">
            UNLOCK SAFEHOUSE
          </button>
          <button className="absolute top-1/2 left-1/2 bg-gray-800 text-white px-4 py-2 rounded glitch">
            ESCAPE PORTAL
          </button>
        </>
      )}
    </div>
  );
}
