"use client";

import lightLogo from "../../assets/Norrtag_VY_orig_rgb.png";
import darkLogo from "../../assets/Norrtag_VY_ljusbl_linje_rgb.png";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Login() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  if (!mounted) {
    return null;
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) setError(res.error);
    else redirect("/dashboard");
  };

  return (
    <div className="w-full sm:w-[450px] md:w-[550px] mx-auto">
      <Card className="bg-white dark:bg-grey-800 border dark:border-grey-500">
        <CardHeader className="flex flex-col items-center justify-center space-y-4 text-center mt-6">
          <Image
            src={theme === "dark" ? darkLogo : lightLogo}
            alt="Norrtag Logo"
            width={259}
            height={56}
          />
          <CardTitle className="font-bold pt-6">Welcome</CardTitle>
          <CardDescription className="text-grey-600 dark:text-grey-100">
            Please enter your details to login
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-2">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}

            <div className="space-y-7 pb-7">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-1">
                  <span>Email</span>
                  <span className="text-red-500 p-1">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@gmail.com"
                  className="w-full h-[48px] p-2 border rounded dark:bg-grey-600 dark:border-grey-500 p-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="flex items-center space-x-1"
                >
                  <span>Password</span>
                  <span className="text-red-500 p-1">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full h-[48px] p-2 border rounded dark:bg-grey-600 dark:border-grey-500 p-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-yellow-200 text-blue-700 font-bold"
              >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
