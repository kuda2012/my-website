// WaveTitle.jsx
import React from "react";
import "./WaveTitle.css";

const WaveTitle = ({ text }) => {
  return (
    <h1 className="wave-title">
      {text.split("").map((char, i) => (
        <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>
          {char}
        </span>
      ))}
    </h1>
  );
};

export default WaveTitle;
