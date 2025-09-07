import { getThoughts } from "./Requests";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function ThoughtsContent() {
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["thoughts"],
  //   queryFn: getThoughts,
  //   staleTime: 60_000, // optional: cache for 1 min
  // });

  return (
    <>
      <div className="p-6 max-w-2xl w-full">
        <div>
          {/* <a
            href="https://x.com/syncretismftw"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-gray-200 hover:text-gray-300 hover:underline text-lg mt-0 transform transition-transform duration-300 hover:scale-105"
          >
            My thoughts are on&nbsp;
            <img
              src="/logo-white.png"
              alt="x"
              className="w-3 h-3 relative top-0.5"
            />
          </a> */}
          <a
            href="https://x.com/syncretismftw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200 hover:text-white transition duration-300 space-x-2"
          >
            <span>Follow me on</span>
            <img
              src="/logo-white.png"
              alt="x"
              className="w-3 h-3 relative top-0.5"
            />
          </a>
        </div>
        {/* <div className="mt-4">
          {isLoading && <p>Loading…</p>}
          {isError && <p>Failed to load thoughts</p>}
          {data && (
            <ul>
              {data.map((thought) => (
                <li key={thought.id} className="mb-4">
                  <h3 className="font-semibold">
                    <Link
                      to={`/thoughts/${thought.id}`}
                      className="text-gray-200 hover:text-gray-300 transition-colors duration-200"
                    >
                      {thought.title}
                    </Link>
                  </h3>
                </li>
              ))}
            </ul>
          )}
        </div> */}
      </div>
    </>
  );
}

function ThoughtsList() {
  return <ThoughtsContent />;
}

export default ThoughtsList;
