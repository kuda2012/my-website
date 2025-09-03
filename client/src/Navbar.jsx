import { NavLink } from "react-router-dom";

// Navbar.jsx
export default function Navbar() {
  return (
    <nav className="w-full bg-gray-800 text-white">
      <div className="flex justify-between items-center px-6 py-4">
        {/* <h1 className="text-xl font-bold">Kuda</h1> */}
        <ul className="flex space-x-6">
          <li>
            {/* <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-gray-300 ${isActive ? "underline" : ""}`
              }
            >
              🏠
            </NavLink> */}
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `hover:text-gray-300 ${isActive ? "underline" : ""}`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <a
              href="https://chromewebstore.google.com/detail/workdiary/lbjmgndoajjfcodenfoicgenhjphacmp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              Workdiary
            </a>
          </li>
          <li>
            <NavLink
              to="/thoughts"
              className={({ isActive }) =>
                `hover:text-gray-300 ${isActive ? "underline" : ""}`
              }
            >
              Thoughts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/future-projects"
              className={({ isActive }) =>
                `hover:text-gray-300 ${isActive ? "underline" : ""}`
              }
            >
              Future projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `hover:text-gray-300 ${isActive ? "underline" : ""}`
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
