import { useEffect, useRef, useState } from "react";
import "./Ticker.css";

// Split a string into span elements with staggered negative delays like the CodePen's SCSS mixin
function RuneWaveText({ text }) {
  return (
    <span className="rs-text" aria-label={text}>
      {text}
    </span>
  );
}

// Horizontal scrolling marquee that sequences 3 separate messages, with pause/play
function Ticker({ messages = [], paused = false, onToggle = () => {} }) {
  const [idx, setIdx] = useState(0);
  const vpRef = useRef(null);
  const txRef = useRef(null);
  const btnRef = useRef(null);
  const xRef = useRef(0);
  const rafRef = useRef(0);
  const lastRef = useRef(
    typeof performance !== "undefined" ? performance.now() : Date.now()
  );
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(max-width: 640px)").matches;
  const speed = isMobile ? 130 : 190;
  const message = messages[idx] || "";

  // Initialize starting X whenever the message changes
  useEffect(() => {
    const vp = vpRef.current;
    const tx = txRef.current;
    if (!vp || !tx) return;
    // Start position depends on viewport size (mobile vs desktop)

    const multiplier = isMobile ? 1.7 : 1.0; // mobile starts farther off-screen
    xRef.current = vp.clientWidth * multiplier + 16; // start off the right edge
    tx.style.transform = `translateX(${xRef.current}px)`;
  }, [message]);

  // RAF loop to scroll left; when it exits, advance to next message
  useEffect(() => {
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(max-width: 640px)").matches;
    const currentSpeed = isMobile ? speed * 0.7 : speed; // slower on mobile

    const step = (now) => {
      const last = lastRef.current;
      const dt = Math.max(0, (now - last) / 1000);
      lastRef.current = now;
      if (!paused) {
        const tx = txRef.current;
        const vp = vpRef.current;
        if (tx && vp) {
          const w = tx.scrollWidth;
          const btnW = btnRef.current ? btnRef.current.offsetWidth + 8 : 0;
          xRef.current -= currentSpeed * dt;
          if (xRef.current + w < -btnW) {
            setIdx((i) => (i + 1) % Math.max(1, messages.length));
          } else {
            tx.style.transform = `translateX(${xRef.current}px)`;
          }
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, speed, messages.length]);

  return (
    <>
      <div
        className="rs-ticker-bar"
        role="region"
        aria-label="RuneScape-style ticker"
      >
        <button
          ref={btnRef}
          className="rs-toggle"
          type="button"
          aria-pressed={!paused}
          aria-label={paused ? "Play ticker" : "Pause ticker"}
          onClick={onToggle}
        >
          {paused ? "▶" : "❚❚"}
        </button>
        <div ref={vpRef} className="rs-viewport" aria-live="polite">
          <div
            ref={txRef}
            style={{ transform: "translateX(0)", translate: "0 -2px" }}
          >
            <RuneWaveText text={message} />
          </div>
        </div>
      </div>
    </>
  );
}
export default Ticker;
