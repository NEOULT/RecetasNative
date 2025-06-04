import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getUserId() {
    try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId !== null) {
            return userId;
        } else {
            console.warn('No userId found in AsyncStorage');
            return null;
        }
    } catch (error) {
        console.error('Error retrieving userId from AsyncStorage:', error);
        return null;
    }
};

