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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Login() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <div className="w-[585] h-[669]">
      <Card className="bg-white dark:bg-grey-800  border dark:border-grey-500">
        <CardHeader className="flex flex-col items-center justify-center space-y-4 text-center mt-6">
          <Image
            src={theme === "dark" ? darkLogo : lightLogo}
            alt="Norrtag VY Logo"
            width={239}
            height={56}
          />
          <CardTitle className="font-bold pt-7">Welcome</CardTitle>
          <CardDescription className="text-grey-600 dark:text-grey-100">
            Please enter your details to login
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-4">
            <div className="space-y-2 pb-7">
              <Label htmlFor="email" className="flex items-center space-x-1">
                <span>Email</span>
                <span className="text-red-500 p-1">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="johndoe@gmail.com"
                required
              />
            </div>
            <div className="space-y-2 pb-7">
              <Label htmlFor="password" className="flex items-center space-x-1">
                <span>Password</span>
                <span className="text-red-500 p-1">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password "
                required
              />
            </div>
            <div className="pb-7">
              <Button
                type="submit"
                className="w-full bg-yellow-200 text-blue-700"
              >
                Login
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
