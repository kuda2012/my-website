import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import RuneTicker from "./RuneTicket";
import WaveTitle from "./WaveTitle";
import About from "./About";
import ThoughtsList from "./ThoughtsList";
import Thought from "./Thought";
import FutureProjects from "./FutureProjects";
import Contact from "./Contact";
import { Routes, Route, useLocation, Link } from "react-router-dom";

function App() {
  const [paused, setPaused] = useState(false);
  const [waveKey, setWaveKey] = useState(0);
  const location = useLocation();
  const isHome = location.pathname === "/";
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
      {/* <div style={{ height: "44px" }} /> */}
      <div
        id="app"
        className={`flex flex-col items-center justify-center space-y-7 ${isHome ? "mt-24" : "mt-0"} mr-5`}
      >
        {isHome ? (
          <>
            {paused ? (
              <h1 className="wave-title">Kuda</h1>
            ) : (
              <WaveTitle key={waveKey} text="Kuda" />
            )}
            <img
              src="/selfie.jpeg"
              alt="Logo"
              className="w-64 h-90 rounded-md"
            />
            <Navbar />
          </>
        ) : (
          <Link
            to="/"
            aria-label="Back to home"
            className="fixed top-8 left-3 text-5xl leading-none select-none text-gray-700 hover:text-gray-600"
          >
            ←
          </Link>
        )}
        <Routes>
          <Route path="/" />
          <Route path="/about" element={<About />} />
          {/* Workdiary is an external link; no internal route needed */}
          <Route path="/thoughts" element={<ThoughtsList />} />
          <Route path="/thoughts/:id" element={<Thought />} />
          <Route path="/future-projects" element={<FutureProjects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
