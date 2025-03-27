import { useEffect, useState } from "react";

export default function SecretMessage() {
  const [isBright, setIsBright] = useState(true);

  useEffect(() => {
    if ("AmbientLightSensor" in window) {
      try {
        const sensor = new AmbientLightSensor();
        sensor.addEventListener("reading", () => {
          setIsBright(sensor.illuminance > 10); // Adjust threshold
        });
        sensor.start();
      } catch (e) {
        console.error("Ambient Light Sensor not supported", e);
      }
    } else {
      console.log("Ambient Light Sensor API not available");
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <h1
        className={`text-5xl font-bold text-center select-none transition-all ${
          isBright ? "text-black" : "neon-text"
        }`}
      >
        You are my Sunshine
      </h1>
    </div>
  );
}
