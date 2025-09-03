function Thoughts() {
  const entries = [
    "Short thought about X…",
    "Another thought about Y…",
    "And another…",
  ];
  return (
    <>
      {" "}
      <div>
        <a
          href="https://x.com/syncretismftw"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2"
        >
          <img src="/x.png" alt="x" className="w-6 h-6" />
          My X/Twitter
        </a>
      </div>
      <div className="p-6 max-w-2xl w-full">
        {entries.map((t, i) => (
          <article key={i} className={i ? "border-t pt-4 mt-4" : ""}>
            {t}
          </article>
        ))}
      </div>
    </>
  );
}
export default Thoughts;
