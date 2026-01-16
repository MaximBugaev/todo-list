import { useEffect, useState } from "react";

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(
    () => {
      const saved = localStorage.getItem("darkMode");
      return saved
        ? JSON.parse(saved)
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  );

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));

    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      // if (localStorage.getItem("darkMode") === null) {
      setIsDarkMode(e.matches);
      // }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return {
    isDarkMode,
    setIsDarkMode,
    toggle: () => setIsDarkMode(!isDarkMode),
  };
}
