import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import RuneTicker from "./RuneTicket";
import WaveTitle from "./WaveTitle";

function App() {
  const [paused, setPaused] = useState(false);
  const [waveKey, setWaveKey] = useState(0);
  return (
    <>
      <RuneTicker
        paused={paused}
        onToggle={() =>
          setPaused((p) => {
            const next = !p;
            if (!next) setWaveKey((k) => k + 1);
            return next;
          })
        }
        messages={[
          "Thisiskuda.com",
          "I am your host, Kuda.",
          "Please don't tell me I have a cool name lol what do you mean by that 🤔",
          "Regardless, I think you should stay a while. There's so much we'll get into",
        ]}
        speed={190}
      />
      {/* Spacer so content doesn't hide under fixed bar */}
      <div style={{ height: "44px" }} />
      <div
        id="app"
        className="flex flex-col items-center justify-center space-y-4"
      >
        {paused ? (
          <h1 className="wave-title">Kuda</h1>
        ) : (
          <WaveTitle key={waveKey} text="Kuda" />
        )}
        <img src="/selfie.jpeg" alt="Logo" className="w-64 h-90" />
        <Navbar />
        {/* <div>
          <a
            href="https://x.com/syncretismftw"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2"
          >
            <img src="/x.png" alt="x" className="w-6 h-6" />
            My X/Twitter
          </a>
        </div> */}
      </div>
    </>
  );
}

export default App;
