import {ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import AuthProvider from '../context/authContext.jsx';
import {navigationLightTheme, navigationDarkTheme} from '../styles/theme/navigationColors.js';
import { useTheme, ThemeProviderCustom } from '../styles/theme/ThemeContext.js';
import { Poppins_600SemiBold, Poppins_500Medium, Poppins_400Regular} from '@expo-google-fonts/poppins';
import { Roboto_400Regular, Roboto_300Light } from '@expo-google-fonts/roboto';
import { useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';

function LayoutWithTheme() {

    const { isDark } = useTheme();

    SplashScreen.preventAutoHideAsync();

    const [loaded, error] = useFonts({
        Poppins_600SemiBold,
        Poppins_500Medium,
        Poppins_400Regular,
        Roboto_400Regular,
        Roboto_300Light,
    });

    useEffect(() => {
        if (loaded || error) {
        SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }
    
    
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
