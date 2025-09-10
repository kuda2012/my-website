import { NavLink } from "react-router-dom";

// Navbar.jsx
export default function Navbar() {
  return (
    <nav className="w-full bg-gray-800 text-white rounded-lg">
      <div className="flex justify-between items-center px-6 py-4">
        {/* <h1 className="text-xl font-bold">Kuda</h1> */}
        <ul className="flex space-x-6">
          <li>
            <NavLink
              to="/about"
              className={() =>
                `text-[#b3b7ff] hover:text-gray-300 whitespace-nowrap `
              }
            >
              About me
            </NavLink>
          </li>
          <li>
            <a
              href="https://chromewebstore.google.com/detail/workdiary/lbjmgndoajjfcodenfoicgenhjphacmp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#b3b7ff] hover:text-gray-300 whitespace-nowrap"
            >
              Workdiary
            </a>
          </li>
          <li>
            <NavLink
              to="/thoughts"
              className={() =>
                `text-[#b3b7ff] hover:text-gray-300 whitespace-nowrap`
              }
            >
              Thoughts
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/future-projects"
              className={({ isActive }) =>
                `hover:text-gray-300 ${isActive ? "underline" : ""}`
              }
            >
              Future projects
            </NavLink>
          </li> */}
          <li>
            <NavLink
              to="/contact"
              className={() =>
                `text-[#b3b7ff] hover:text-gray-300 whitespace-nowrap`
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
