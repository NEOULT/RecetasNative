// navigationColors.js
import { lightTheme, darkTheme } from './colors';
import { fonts } from './fonts';

export const navigationLightTheme = {
  dark: false,
  colors: {
    primary: lightTheme.primary ?? '#6200ee',
    background: lightTheme.layout_backgroundcolor ?? '#ffffff',
    card: lightTheme.card ?? '#ffffff',
    text: lightTheme.regular_textcolor ?? '#000000',
    border: lightTheme.border ?? '#c7c7c7',
    notification: lightTheme.notification ?? '#ff80ab',
    regular: lightTheme.regular_textcolor ?? '#000000',
  },
  fonts,
};

export const navigationDarkTheme = {
  dark: true,
  colors: {
    primary: darkTheme.primary ?? '#6200ee',
    background: darkTheme.layout_backgroundcolor ?? '#000000',
    card: darkTheme.card ?? '#222222',
    text: darkTheme.regular_textcolor ?? '#ffffff',
    border: darkTheme.border ?? '#444444',
    notification: darkTheme.notification ?? '#ff80ab',
    regular: darkTheme.regular_textcolor ?? '#ffffff',
  },
  fonts,
};