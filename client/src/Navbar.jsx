import { NavLink } from "react-router-dom";

// Navbar.jsx
export default function Navbar() {
  return (
    <nav className="w-full bg-gray-800 text-white rounded-lg">
      <div className="flex justify-between items-center px-6 py-4">
        {/* <h1 className="text-xl font-bold">Kuda</h1> */}
        <ul className="flex space-x-6">
          {/* <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-gray-300 ${isActive ? "underline" : ""}`
              }
            >
              🏠
            </NavLink>
          </li> */}
          {/* <liv>
            <a
              href="https://x.com/syncretismftw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-200 hover:text-gray-300 text-lg mt-0 transform transition-transform duration-300 hover:scale-105"
            >
              Follow me on{" "}
              <img src="/logo-white.png" alt="x" className="w-4 h-4" />
            </a>
          </liv> */}
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `hover:text-gray-300 ${isActive ? "underline" : ""} whitespace-nowrap`
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
              className="hover:text-gray-300 whitespace-nowrap"
            >
              Workdiary
            </a>
          </li>
          <li>
            <NavLink
              to="/thoughts"
              className={({ isActive }) =>
                `hover:text-gray-300 ${isActive ? "underline" : ""} whitespace-nowrap`
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
              className={({ isActive }) =>
                `hover:text-gray-300 ${isActive ? "underline" : ""} whitespace-nowrap`
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
