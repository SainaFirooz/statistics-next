"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { ModeToggle } from "./ToggleDarkMode";
import { useState, useEffect } from "react";

import lightLogo from "../assets/Norrtag_VY_orig_rgb.png";
import darkLogo from "../assets/Norrtag_VY_ljusbl_linje_rgb.png";

const Header = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const handleLogoClick = () => {
    window.location.assign("/dashboard");
  };

  return (
    <header className="flex items-center justify-between p-4 border-b-2 border-b-yellow-500 bg-white dark:bg-grey-800">
      <div>
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

      {mounted && <ModeToggle />}
    </header>
  );
};

export default Header;
