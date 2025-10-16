"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/store";
import { LOGOUT } from "@/store/auth/slice";
import Cookies from "js-cookie";
import { DoorOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export function Navbar() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(LOGOUT());
    Cookies.remove("token");
  };

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

        <div className="hidden md:flex items-center space-x-6 text-sm font-semibold">
          <Link to="/" className="hover:text-gray-700 transition">
            Dashboard
          </Link>
          <Link to="/tasks" className="hover:text-gray-700 transition">
            Tasks
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="rounded-full size-10 cursor-pointer hidden md:block">
                <AvatarImage
                  src="https://i.pinimg.com/736x/e5/8b/50/e58b50f688e6ecaea2cdc469bcce79d3.jpg"
                  alt="User"
                  className="object-cover"
                />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[#faae2b] border border-black/20 rounded-xl w-52 px-2 py-2 shadow-[6px_6px_0px_#222] font-mono"
            >
              <DropdownMenuItem asChild>
                <Button
                  onClick={handleLogout}
                  className="flex justify-start items-center bg-transparent text-left text-sm cursor-pointer font-mono text-black w-full px-3 py-2 rounded-lg transition hover:bg-black/10"
                >
                  <DoorOpen className="mr-1" />
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-black bg-[#f4fafa] shadow-[4px_4px_0px_#222] px-4 py-3 space-y-3">
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

          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-800 transition"
          >
            <DoorOpen className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
