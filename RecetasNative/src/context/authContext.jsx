import { createContext, useState, useEffect} from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                setToken(token);
                
            }
        } catch (e) {
            console.error('Error retrieving token:', e);
        } finally {
            setLoading(false);
            setIsLoggedIn(true);
        }
        };

        checkToken();
    }, []);

    const saveToken = async (token) => {
        try {
            await AsyncStorage.setItem('token', token);
            setToken(token);
        } catch (e) {
            console.error('Error saving token:', e);
        }
    };

    const getToken = async () => {
        try {
            return await AsyncStorage.getItem('token');
        } catch (e) {
            console.error('Error getting token:', e);
            return null;
        }
    };

    const removeToken = async () => {
        try {
            await AsyncStorage.removeItem('token');
            setToken(null);
        } catch (e) {
            console.error('Error removing token:', e);
        }
    };

    const logIn = async(token) =>{
        await saveToken(token);
        router.replace('/recipes');
    }

    const logOut = async() => {
        await removeToken();
        router.replace('/login');
    }

    return (
        <AuthContext.Provider value={{isLoggedIn, logIn, logOut, loading, saveToken, getToken, removeToken, token}}>
            {children}
        </AuthContext.Provider>
    );
}