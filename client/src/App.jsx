import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { getAbout, getStockPrice } from "./Requests"; // <-- adjust path as in your project
import Navbar from "./Navbar";
import Ticker from "./Ticker";
import WaveTitle from "./WaveTitle";
import About from "./About";
import ThoughtsList from "./ThoughtsList";
import Thought from "./Thought";
import FutureProjects from "./FutureProjects";
import Contact from "./Contact";
import "./App.css";

function App() {
  const [paused, setPaused] = useState(false);
  const [waveKey, setWaveKey] = useState(0);
  const [stockPrice, setStockPrice] = useState(null);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["about"],
      queryFn: getAbout,
      // keep it fresh for a while so it won't re-fetch on first open
      staleTime: 5 * 60 * 1000,
    });
  }, [queryClient]);

  useEffect(() => {
    getStockPrice()
      .then((price) => setStockPrice(price))
      .catch(() => setStockPrice(null));
  }, []);
  return (
    <>
      <Ticker
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
          stockPrice !== null
            ? `📈 KDM ${Number(stockPrice).toFixed(2)} ▲`
            : "Loading...",
        ]}
        speed={190}
      />
      {/* Spacer so content doesn't hide under fixed bar */}
      {/* <div style={{ height: "44px" }} /> */}
      <div
        id="app"
        className={`flex flex-col items-center justify-center space-y-7 ${isHome ? "mt-24" : "mt-0"}`}
      >
        {isHome ? (
          <>
            {paused ? (
              <h1 className="wave-title">Kuda</h1>
            ) : (
              <WaveTitle key={waveKey} text="Kuda" />
            )}
            <img
              src="/selfie.jpg"
              alt="Logo"
              className="w-64 h-90 rounded-md"
            />
            <Navbar />
          </>
        ) : (
          <Link
            to="/"
            aria-label="Back to home"
            className="fixed top-10 left-3 text-3xl leading-none select-none text-gray-700 hover:text-gray-600"
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
