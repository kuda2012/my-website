import React from "react";
import { Link } from "react-router-dom";
import { getAbout } from "./Requests";
import { useQuery } from "@tanstack/react-query";

function About() {
  const { isLoading, isError } = useQuery({
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
            at any one of these characteristics, but having high levels of all
            these inconjunction is what sets me apart. This is the result of
            good genetics combined with the humble upbringing of being a late
            bloomer. Having experienced both ends of the loser-winner spectrum,
            I feel that is impossible for me to ever forget my roots, no matter
            how high I climb.
          </p>
          <p className="about-me text-sm">
            I made this website so I can be findable. We live in an age where
            the process for matching people with the jobs and relationships that
            they deserve is broken. The issue is that it is very difficult to
            create an online representation of yourself that genuinely
            represents the aspects of your being that would translate to being a
            good match for a situation in the real world. Thus, this is my my
            best attempt of give you a glimpse into my soul so I can transcend
            the 1000 people in your queue that are interested in whatever you
            are offering online.
          </p>
          <p className="about-me text-sm">
            If you are interested in hiring me, or just want to reach out, see
            the Contact form link below. I am a Software engineer by trade, with
            my proof of work being this website, the Workdiary project on the
            frontpage, and my overall good taste across many different avenues
            of life. Cheers.
          </p>
        </>
      )}

      <Link
        to="/contact"
        className="inline-block text-green-400 visited:text-green-400 hover:text-green-300 cursor-pointer"
      >
        Contact me
      </Link>
    </div>
  );
}
export default About;
