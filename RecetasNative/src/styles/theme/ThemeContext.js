// theme/ThemeContext.js
import React, { createContext, useState, useContext } from 'react';
import { lightTheme,darkTheme } from './colors';

export const ThemeContext = createContext({
  isDark: false,
  colors: lightTheme,
  setScheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  
  const defaultTheme = {
    colors: isDark ? darkTheme : lightTheme,
    isDark,
    setScheme: (scheme) => {setIsDark(scheme === 'dark')},
  };
  console.log(isDark);
  

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);