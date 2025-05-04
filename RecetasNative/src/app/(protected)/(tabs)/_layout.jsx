import { Tabs } from 'expo-router';
import React from 'react';
import {Image, Text, Pressable, Platform} from 'react-native';
import { useRouter } from 'expo-router';


const router = useRouter(); 
// import { HapticTab } from '../../components/HapticTab';

// import TabBarBackground from '@/components/ui/TabBarBackground';
// import { Colors } from '@/constants/Colors';

import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  // const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // headerShown: true,
        // tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        tabBarActiveTintColor: '#FF9100',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: Platform.select({
          ios: {    
            // Use a transparent background on iOS to show the blur effect
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
            <Feather
              name="menu"
              size={24}
              color="black"
              style={{ marginLeft: 20 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="addButton"
        options={{
          title: 'Add',
          tabBarIcon: ({ color }) => <FontAwesome6 name="plus" size={29} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="heart-outline" size={29} color={color} />,
        }}
      />
      <Tabs.Screen name="profile" options={{ href: null }} />
    </Tabs>
  );
}
