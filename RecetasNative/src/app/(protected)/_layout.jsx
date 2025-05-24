
import { Stack,Redirect } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext.jsx';
import { ActivityIndicator,View } from 'react-native';

export default function ProtectedLayout() {

  const { isLoggedIn, token, loading } = useContext(AuthContext);
  console.log('AuthContext:', isLoggedIn, token);
  
  const authInactive = false;
  console.log('AuthInactive:', (authInactive || isLoggedIn));

  console.log('Loading:', loading);
  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!isLoggedIn || !token) {
    return <Redirect href="/login" />;
  }

  // Si está logueado y hay token, muestra las tabs
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );

  
}
