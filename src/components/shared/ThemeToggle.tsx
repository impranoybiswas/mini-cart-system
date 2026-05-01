"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <button className="btn-circular">
        <span className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="btn-circular overflow-hidden group"
      aria-label="Toggle theme"
    >
      {/* Sun icon for light mode (rotates to 0 and scales up in light mode, rotates 90deg and scales down in dark mode) */}
      <Sun className="h-5 w-5 transition-all duration-500 absolute rotate-0 scale-100 dark:-rotate-90 dark:scale-0 group-hover:drop-shadow-md" />

      {/* Moon icon for dark mode (reverses the behavior scaling down in light mode) */}
      <Moon className="h-5 w-5 transition-all duration-500 absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100 group-hover:drop-shadow-md" />
    </button>
  );
}
