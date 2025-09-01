import React from "react";
import "./NewtonCradle.css";

const balls = ["", "K", "U", "D", "A", ""];

export default function NewtonCradle() {
  return (
    <div className="cradle-wrapper">
      <div className="beam"></div>
      <div className="cradle">
        {balls.map((letter, index) => (
          <div key={index} className={`cradle-unit ball-${index}`}>
            <div className="string">
              <div></div>
            </div>
            <div className="ball">{letter}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
