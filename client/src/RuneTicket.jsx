import { useEffect, useMemo, useRef, useState } from "react";

// Styles that mimic the RuneScape chat vibe
const RuneStyles = () => (
  <style>{`
    .rs-ticker-bar {
      position: fixed; inset: 0 0 auto 0; z-index: 50;
      display: flex; align-items: center;
      padding: .35rem .75rem; background: #000000cc; backdrop-filter: blur(2px);
      border-bottom: 1px solid #111; box-shadow: 0 1px 0 rgba(255,255,255,.06) inset;
      /* make room for the overlaid button on the left */
      padding-left: 2.25rem; /* ~button width */
    }
    .rs-toggle { position:absolute; left:.5rem; top:50%; transform:translateY(-50%);
      font-size: 12px; padding: .2rem .45rem; border-radius: 4px; background: #222; color: #fff; border: 1px solid #333; z-index: 2; }
    .rs-toggle:hover { background: #2c2c2c; }
    .rs-viewport { position: relative; overflow: hidden; white-space: nowrap; flex: 1; }
    .rs-text { display: inline-block; will-change: transform; color:#ff0; text-shadow: 1px 1px 0 #000; font-family: 'runescape_chat_bold_07regular', system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
    /* When this class is on a wrapper, pause all CSS animations inside it */
    .anim-paused * { animation-play-state: paused !important; transition-property: none !important; }
  `}</style>
);

// Split a string into span elements with staggered negative delays like the CodePen's SCSS mixin
function RuneWaveText({ text }) {
  return (
    <span className="rs-text" aria-label={text}>
      {text}
    </span>
  );
}

// Horizontal scrolling marquee that sequences 3 separate messages, with pause/play
function RuneTicker({
  messages = [],
  speed = 140,
  paused = false,
  onToggle = () => {},
}) {
  const [idx, setIdx] = useState(0);
  const vpRef = useRef(null);
  const txRef = useRef(null);
  const btnRef = useRef(null);
  const xRef = useRef(0);
  const rafRef = useRef(0);
  const lastRef = useRef(
    typeof performance !== "undefined" ? performance.now() : Date.now()
  );

  const message = messages[idx] || "";

  // Initialize starting X whenever the message changes
  useEffect(() => {
    const vp = vpRef.current;
    const tx = txRef.current;
    if (!vp || !tx) return;
    xRef.current = vp.clientWidth + 16; // start just off the right edge
    tx.style.transform = `translateX(${xRef.current}px)`;
  }, [message]);

  // RAF loop to scroll left; when it exits, advance to next message
  useEffect(() => {
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
          xRef.current -= speed * dt;
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
      <RuneStyles />
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
export default RuneTicker;
