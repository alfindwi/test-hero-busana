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
import { useAppDispatch, useAppSelector } from "@/store";
import { loginAsync } from "@/store/auth/async";
import { Loader2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

export function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<{ email: string; password: string }> = async (
    data
  ) => {
    const res = await dispatch(loginAsync(data));

    if (loginAsync.fulfilled.match(res)) {
      toast.success("Login successful!", {
        duration: 3000,
        icon: "🚀",
        style: {
          background: "#3A7D44",
          color: "#FCFAEE",
          fontWeight: "600",
          borderRadius: "6px",
          boxShadow: "5px 5px 0px #222222",
          fontFamily: "monospace",
        },
      });

      reset({
        email: "",
        password: "",
      });

      navigate("/");
    } else if (loginAsync.rejected.match(res)) {
      toast.error(error, {
        duration: 3000,
        icon: "🚀",
        style: {
          background: "#B8001F",
          color: "#FCFAEE",
          fontWeight: "600",
          borderRadius: "6px",
          boxShadow: "5px 5px 0px #222222",
          fontFamily: "monospace",
        },
      });
    }
  };

 
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFDF6] px-4">
      <div className="flex flex-col gap-6 w-full max-w-md sm:max-w-md md:max-w-lg">
        <Card className="bg-[#f2f7f5] text-black font-mono border border-black rounderd-lg shadow-[8px_8px_0px_#222222]">
          <CardHeader>
            <CardTitle className="text-black text-xl">Login</CardTitle>
            <CardDescription className="text-black/80">
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                  <Label>
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="johndoe@example.com"
                    {...register("email")}
                    required
                  />
                  <p className="text-red-500">{errors.email && errors.email.message}</p>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">
                      Password<span className="text-red-500">*</span>
                    </Label>
                  </div>
                  <PasswordInput
                    id="password"
                    placeholder="•••••"
                    required
                    {...register("password")}
                  />
                  <p className="text-red-500">{errors.password && errors.password.message}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <Button type="submit" variant={"blue"}>
                    {loading ? (
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
              </div>

              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/register" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
