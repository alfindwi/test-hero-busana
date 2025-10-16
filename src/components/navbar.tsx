"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#f4fafa] border-b border-black shadow-[4px_4px_0px_#222] font-mono z-50 fixed top-0 w-full">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="text-xl font-bold text-black tracking-wide">
          HERO BUSANA.
        </Link>

        <button
          className="md:hidden text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        <div className="hidden md:flex space-x-6 text-sm font-semibold">
          <Link to="/" className="hover:text-gray-700 transition">
            Dashboard
          </Link>
          <Link to="/tasks" className="hover:text-gray-700 transition">
            Tasks
          </Link>
          <Link to="/users" className="hover:text-gray-700 transition">
            Users
          </Link>
          <Link to="/reports" className="hover:text-gray-700 transition">
            Reports
          </Link>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-black bg-[#f4fafa] shadow-[4px_4px_0px_#222] px-4 py-3 space-y-2">
          <Link
            to="/"
            className="block text-sm font-semibold hover:text-gray-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/tasks"
            className="block text-sm font-semibold hover:text-gray-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Tasks
          </Link>
          <Link
            to="/users"
            className="block text-sm font-semibold hover:text-gray-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Users
          </Link>
          <Link
            to="/reports"
            className="block text-sm font-semibold hover:text-gray-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Reports
          </Link>
        </div>
      )}
    </nav>
  );
}
