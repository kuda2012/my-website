import { Link } from "react-router-dom";
import React from "react";
import { getAbout } from "./Requests";
import { useQuery } from "@tanstack/react-query";

function About() {
  const {
    data: about,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["about"],
    queryFn: getAbout,
    staleTime: 60_000,
  });

  return (
    <div className="p-6 space-y-4 max-w-2xl text-center">
      {isLoading ? (
        <p>Loading…</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load about information.</p>
      ) : (
        <p>{about?.content}</p>
      )}
      <Link
        to="/contact"
        className="underline inline-block text-green-400 visited:text-green-400 hover:text-green-300 cursor-pointer"
      >
        Contact me
      </Link>
    </div>
  );
}

export default About;
