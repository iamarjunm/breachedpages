import React, { useState } from "react";

const SecretLink = () => {
  const [isHovering, setIsHovering] = useState(false);

  // Random hidden link position
  const hiddenLinkStyle = {
    position: "absolute",
    top: "40%", // Adjust this to change the hidden link position
    left: "60%", // Adjust this to change the hidden link position
    width: "50px",
    height: "50px",
    background: isHovering ? "rgba(255, 255, 255, 0.2)" : "transparent", // Becomes visible on hover
    cursor: "pointer",
    zIndex: 10,
    borderRadius: "50%",
    transition: "background 0.3s ease",
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "black", // Blank screen
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
      onMouseMove={(e) => {
        const linkArea = e.target.closest(".hidden-link");
        setIsHovering(!!linkArea);
      }}
    >
      {/* Hidden Link */}
      <a
        href="https://docs.google.com/document/d/1ZuGqMmVS8ynOXqCCuoe6NFWBs1PFCMvqypl-Z-YkL2I/edit?tab=t.0"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden-link"
        style={hiddenLinkStyle}
      ></a>

      {/* Cursor Indicator */}
      {isHovering && (
        <div
          style={{
            position: "fixed",
            top: 10,
            right: 10,
            color: "white",
            fontSize: "14px",
          }}
        >
          🔍 You found the secret link!
        </div>
      )}
    </div>
  );
};

export default SecretLink;
