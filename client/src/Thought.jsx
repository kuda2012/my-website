import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getThoughts } from "./Requests";

const Thought = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  // Try to seed from the thoughts list cache
  const thoughtsQueryState = queryClient.getQueryState(["thoughts"]);
  const thoughtsList = queryClient.getQueryData(["thoughts"]);
  let initialData, initialDataUpdatedAt;
  if (thoughtsList && Array.isArray(thoughtsList)) {
    const found = thoughtsList.find((t) => String(t.id) === String(id));
    if (found) {
      initialData = found;
      if (thoughtsQueryState && thoughtsQueryState.dataUpdatedAt) {
        initialDataUpdatedAt = thoughtsQueryState.dataUpdatedAt;
      }
    }
  }

  const {
    data: thought,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["thought", id],
    queryFn: async () => {
      const thoughts = await getThoughts();
      return thoughts.find((t) => String(t.id) === String(id));
    },
    initialData,
    initialDataUpdatedAt,
    staleTime: 60_000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!thought) return <div>Thought not found.</div>;

  return (
    <div>
      <h2>{thought.title}</h2>
      <p>{thought.body}</p>
      <Link to="/thoughts">Back to thoughts</Link>
    </div>
  );
};

export default Thought;
