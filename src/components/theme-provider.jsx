import { createContext, useContext, useEffect, useState } from "react";

const ThemeProviderContext = createContext({
  theme: "light",
  setTheme: () => null,
});

export function ThemeProvider({ children, storageKey = "vite-ui-theme" }) {
  const [theme, setThemeState] = useState("light");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add("light");
  }, []);

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme: () => {} }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
