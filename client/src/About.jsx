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
        <>
          {/* <div dangerouslySetInnerHTML={{ __html: about?.content }} /> */}
          {/* <p className="about-me text-sm md:text-md"> */}
          <p className="about-me text-sm">
            I believe that I am one of the most spiritually in tune, good
            looking, empathetic, intelligent people on earth. I am not the best
            at any one of these things, but I have yet to meet anybody with all
            of these traits combined at such high levels as me. This is the
            result of good genetics combined with the humble upbringing of being
            a late bloomer. Having experienced both ends of the loser-winner
            spectrum, I feel that is impossible to never forget my roots, no
            matter how I climb.
          </p>
          <p className="about-me text-sm">
            I made this website so I can be contactable. We live in an age where
            matching people for jobs and relationships is broken. The
            fundamental issue is that it is very difficult to create an online
            representation of yourself that genuinely presents the aspects of
            your being that would translate to being a good match for a
            situation in the real world. This is my my best attempt of give you
            a glimpse into my soul so I can transcend the 1000 people in your
            queue that are interested in whatever you are offering online.
          </p>
          <p className="about-me text-sm">
            If you are interested in hiring me, see the Contact form link below.
            I am a Software engineer by trade, with my proof of work being this
            website, the Workdiary project on the frontpage, and my overall good
            taste across many different avenues of life. Cheers.
          </p>
        </>
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
