import { Link } from "react-router-dom";

function About() {
  return (
    <div className="p-6 space-y-4 max-w-2xl text-center">
      <p>Hi, I’m Kuda — quick paragraph about who I am.</p>
      <p>
        <Link to="/contact" className="underline">
          Contact me
        </Link>
      </p>
    </div>
  );
}

export default About;
