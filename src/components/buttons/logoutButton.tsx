import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LogoutButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="blue" onClick={onClick}>
      <LogOut size={16} /> Logout
    </Button>
  );
}
