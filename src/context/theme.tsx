import React, { createContext, useState } from "react";
interface ThemeContextProps {
  theme: string;
  setTheme: (color: string) => void;
}
const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  setTheme: () => {},
});
const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const prevTheame = localStorage.getItem("theme");
  const [theme, setTheme] = useState(prevTheame ? prevTheame : "light");
  const valueToShare = {
    theme,
    setTheme,
  };
  return (
    <ThemeContext.Provider value={valueToShare}>
      {children}
    </ThemeContext.Provider>
  );
};
export { ThemeContext, ThemeProvider };
