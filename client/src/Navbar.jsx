import { useState } from "react";

// Navbar.jsx
export default function Navbar() {
  return (
    <nav className="w-full bg-gray-800 text-white">
      <div className="flex justify-between items-center px-6 py-4">
        {/* <h1 className="text-xl font-bold">Kuda</h1> */}
        <ul className="flex space-x-6">
          <li>
            <a href="/" className="hover:text-gray-300">
              🏠
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-gray-300">
              About
            </a>
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
            <a href="/thoughts" className="hover:text-gray-300">
              Thoughts
            </a>
          </li>
          <li>
            <a href="future-projects" className="hover:text-gray-300">
              Future projects
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-gray-300">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
