import { useEffect, useState } from "react";

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if(localStorage.getItem("darkMode")) {
        return JSON.parse(localStorage.getItem("darkMode"))
    } else {
       return window.matchMedia("(prefers-color-scheme: dark)").matches
    }
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));

    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return {
    isDarkMode,
    setIsDarkMode,
    toggle: () => setIsDarkMode(!isDarkMode),
  };
}
