import {ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import AuthProvider from '../context/authContext.jsx';
import {navigationLightTheme, navigationDarkTheme} from '../styles/theme/navigationColors.js';
import { useTheme, ThemeProviderCustom } from '../styles/theme/ThemeContext.js';

function LayoutWithTheme() {
    const { isDark } = useTheme();
    return (
        <ThemeProvider value={isDark ? navigationDarkTheme : navigationLightTheme}>
            <AuthProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(protected)" />
                </Stack>
                <StatusBar style={isDark ? 'light' : 'dark'} />
            </AuthProvider>
        </ThemeProvider>
    );
}

export default function RootLayout() {
    return (
        <ThemeProviderCustom>
            <LayoutWithTheme />
        </ThemeProviderCustom>
    );
}
