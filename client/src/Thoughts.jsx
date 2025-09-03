function Thoughts() {
  const entries = [
    "Short thought about X…",
    "Another thought about Y…",
    "And another…",
  ];
  return (
    <>
      <div className="p-6 max-w-2xl w-full">
        <div>
          <a
            href="https://x.com/syncretismftw"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-gray-200 hover:text-gray-300 text-lg mt-0 transform transition-transform duration-300 hover:scale-105"
          >
            <img src="/x.png" alt="x" className="w-6 h-6" />
            More of my thoughts on X
          </a>
        </div>
      </div>{" "}
    </>
  );
}
export default Thoughts;
