'use client'

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeProps = {
  theme: Theme;
  toggleTheme: () => void;
};

type ThemeProviderProps = {
  children: React.ReactNode;
};

const initialThemeProps: ThemeProps = {
  theme: "light",
  toggleTheme: () => {},
};

export const ThemeContext = createContext<ThemeProps>(initialThemeProps);

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  window.localStorage.setItem("theme", theme);
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const initial = stored === "dark" || stored === "light" ? stored : "light";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
