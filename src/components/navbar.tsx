import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DoorOpen } from "lucide-react";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="bg-[#f4fafa] border-b border-black shadow-[4px_4px_0px_#222] font-mono z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="text-xl font-bold text-black">
          HERO BUSANA.
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="rounded-full size-10 cursor-pointer">
                <AvatarImage
                  src="https://img.freepik.com/premium-photo/memoji-emoji-handsome-smiling-man-white-background_826801-6987.jpg?semt=ais_hybrid&w=740&q=80"
                  alt="User"
                />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-red-500 border border-black/20 rounded-xl w-52 px-2 py-2 shadow-[6px_6px_0px_#222] font-mono"
            >
              <DropdownMenuItem
                asChild
                className="data-[highlighted]:bg-red-500 data-[highlighted]:text-white data-[highlighted]:outline-none"
              >
                <Button className="flex justify-start items-center text-left text-sm cursor-pointer font-mono w-full px-3 py-2 rounded-lg transition bg-red-500 hover:bg-red-500 hover:text-white">
                  <DoorOpen className="text-white" />
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
            <DropdownMenuContent
              align="end"
              className="bg-red-500 border border-black/20 rounded-xl w-52 px-2 py-2 shadow-[6px_6px_0px_#222] font-mono"
            >
              <DropdownMenuItem
                asChild
                className="data-[highlighted]:bg-red-500 data-[highlighted]:text-white data-[highlighted]:outline-none"
              >
                <Button className="flex justify-start items-center text-left text-sm cursor-pointer font-mono w-full px-3 py-2 rounded-lg transition bg-red-500 hover:bg-red-500 hover:text-white">
                  <DoorOpen className="text-white" />
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
