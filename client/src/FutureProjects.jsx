import React from "react";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { getProjects } from "./Requests";

function FutureProjectsContent() {
  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 60_000,
  });

  return (
    <div className="p-6 max-w-2xl space-y-6 w-full">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">Failed to fetch projects.</div>
      ) : (
        projects.map((project) => (
          <section className="border-t pt-4" key={project.id || project.title}>
            <h2 className="font-semibold">{project.title}</h2>
            <div className="mb-2">{project.body}</div>
            <div className="text-sm text-gray-500 flex gap-4">
              <span>Likes: {project.likes}</span>
              {project.created_at && (
                <span>
                  Created: {new Date(project.created_at).toLocaleDateString()}
                </span>
              )}
              {project.updated_at && (
                <span>
                  Updated: {new Date(project.updated_at).toLocaleDateString()}
                </span>
              )}
            </div>
          </section>
        ))
      )}
    </div>
  );
}

function FutureProjects() {
  return <FutureProjectsContent />;
}

export default FutureProjects;
