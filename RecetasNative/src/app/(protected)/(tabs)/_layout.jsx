import { Tabs } from 'expo-router';
import {Image, Text, Pressable, Platform} from 'react-native';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../styles/theme/ThemeContext.js';
import AddButton from '../../../components/AddButtonModal.js';
import { useState } from 'react';

const router = useRouter(); 

import { ApiService } from '../../../services/ApiService.js';

const apiService = new ApiService();

export default function TabLayout() {
  
  const { setScheme, isDark } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
    <Tabs
      screenOptions={{

        tabBarActiveTintColor: '#FF9100',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: Platform.select({
          ios: {    
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) =><Feather name="home" size={29} color={color} />,
          headerRight: () => (
            <Pressable onPress={() => router.push('/profile')}>
                <Image 
                source={{
                  uri: 'https://randomuser.me/api/portraits/women/79.jpg'
                }}
                style={{ width: 40, height: 40, borderRadius: 20, marginRight: 20 }}
                />
            </Pressable>
          ),
          headerTitle: () => (
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#FF9100' }}>
              RecetasNative
            </Text>
          ),
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Pressable onPress={() => {
              setScheme(isDark ? 'light' : 'dark');
              
            }}>
              <Feather
                name="moon"
                size={24}
                color="black"
                style={{ marginLeft: 20, color: isDark ? '#FF9100' : 'black' }}
              />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
          name="addButton"
          options={{
            title: 'Add',
            tabBarIcon: ({ color }) => <FontAwesome6 name="plus" size={29} color={color} />,
            tabBarButton: (props) => (
              <Pressable
                {...props}
                onPress={() => setModalVisible(true)}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
              >
                <FontAwesome6 name="plus" size={29} color={props.accessibilityState?.selected ? '#FF9100' : 'gray'} />
              </Pressable>
            ),
          }}
        />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="heart-outline" size={29} color={color} />,
        }}
      />
      <Tabs.Screen name="profile" options={{ 
        href: null,
        headerShown: false,
        }} />
      <Tabs.Screen name="createRecipe" options={{
        href: null
      }} />
      <Tabs.Screen name="index" options={{ 
        href: null,
        headerShown: false,
        }} />
    </Tabs>
    <AddButton isVisible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
}
