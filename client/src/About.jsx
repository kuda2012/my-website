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
          <p>Howdy</p>
          {/* <div dangerouslySetInnerHTML={{ __html: about?.content }} /> */}
          {/* <p className="about-me text-sm md:text-md"> */}
          <p className="about-me text-sm">
            I believe that I am one of the most spiritually in tune, handsome,
            empathetic, intelligent people on earth. I am not the highest ranked
            at any one of these, but having high levels of these in combination
            is what sets me apart. This is the result of good genetics combined
            with the humble upbringing of being a late bloomer. Having
            experienced both ends of the loser-winner spectrum, I feel that it
            is impossible for me to ever forget my roots, no matter how high I
            climb.
          </p>
          <p className="about-me text-sm">
            I made this website so I can be findable. We live in an age where
            the process for matching people with the jobs and relationships that
            they deserve has broken. The issue is that there's simply too much
            noise in the onine process for someone to be certain that the choice
            they are making will translate to real life well, so people have no
            choice but to reduce the dimensions of their selection process.
            Often leaning heavily on material factors without being able to
            sniff out the intangibles. Thus, this website is my attempt to readd
            some of the dimensionality that would have been lost if I was just a
            mere bidder sitting in an "has applied" queue for whatever you may
            be offering online.
          </p>
          <p className="about-me text-sm">
            If you are interested in hiring me, or just want to reach out, see
            the Contact link below. I am a Software engineer by trade, with my
            proof of work being this website, the{" "}
            <a
              href="https://chromewebstore.google.com/detail/workdiary/lbjmgndoajjfcodenfoicgenhjphacmp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Workdiary chrome extension clickable here
            </a>
            , and my overall good taste across many different avenues of life.
          </p>
          <p>Cheers.</p>
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
