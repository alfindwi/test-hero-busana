import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/passwordInput";

export function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFDF6] px-4">
      <div className="flex flex-col gap-6 w-full max-w-md sm:max-w-md md:max-w-lg">
        <Card className="bg-[#f2f7f5] text-black font-mono border border-black rounderd-lg shadow-[8px_8px_0px_#222222]">
          <CardHeader>
            <CardTitle className="text-black text-xl">Register</CardTitle>
            <CardDescription className="text-black/80">
              Create your account below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label>
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label>
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">
                    Password<span className="text-red-500">*</span>
                  </Label>
                </div>
                <PasswordInput id="password" placeholder="•••••" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" variant={"blue"}>
                  Register
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
