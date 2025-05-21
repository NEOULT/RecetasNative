// theme/ThemeContext.js
import React, { createContext, useState, useContext } from 'react';
import { lightTheme,darkTheme } from './colors';
import { fonts } from './fonts';

export const ThemeContext = createContext({
  isDark: false,
  colors: lightTheme,
  setScheme: () => {},
  fonts: fonts,
});

export const ThemeProviderCustom = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const defaultTheme = {
    colors: isDark ? darkTheme : lightTheme,
    isDark,
    setScheme: (scheme) => {setIsDark(scheme === 'dark')},
    fonts: fonts
  };
  
  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);