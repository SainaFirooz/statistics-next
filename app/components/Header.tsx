"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { ModeToggle } from "./ToggleDarkMode";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

import lightLogo from "../assets/Norrtag_VY_orig_rgb.png";
import darkLogo from "../assets/Norrtag_VY_ljusbl_linje_rgb.png";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { theme } = useTheme();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogoClick = () => {
    window.location.assign("/dashboard");
  };

  return (
    <header className="flex items-center justify-between p-4 border-b-2 border-b-yellow-500 bg-white dark:bg-grey-800">
      <div className="pl-4">
        {mounted ? (
          <Image
            src={theme === "dark" ? darkLogo : lightLogo}
            alt="Logo"
            width={239}
            height={56}
            priority
            onClick={handleLogoClick}
            className="cursor-pointer"
          />
        ) : (
          <Image
            src={lightLogo}
            alt="Logo"
            width={120}
            height={40}
            priority
            onClick={handleLogoClick}
            className="cursor-pointer"
          />
        )}
      </div>

      <div className="flex items-center">
        {mounted && <ModeToggle />}
        {mounted && session && (
          <Button
            variant="ghost"
            onClick={() => signOut()}
            className="px-4 py-2 text-white rounded-md bg-white dark:bg-grey-800 border-transparent transition dark:fill-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
