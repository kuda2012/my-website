import { Link } from "react-router-dom";

function About() {
  return (
    <div className="p-6 space-y-4 max-w-2xl text-center">
      <p>Hi, I’m Kuda — quick paragraph about who I am.</p>
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
