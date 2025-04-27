import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../styles/theme/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function CustomTabBar({ state, descriptors, navigation }) {
  const { colors } = useTheme();

  return (
    <View style={{ backgroundColor: colors.navigation_backgroundcolor }}>
      <View style={[styles.container, { backgroundColor: colors.navigation_backgroundcolor }]}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          let sizeIcon = 28;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Add') {
            iconName = 'add';
          } else if (route.name === 'Favorites') {
            iconName = 'heart-outline';
          }

          const isAddButton = route.name === 'Add';

          if (isFocused) {
            sizeIcon += isAddButton ? 12 : 4;
          }

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={isAddButton ? styles.addButtonContainer : styles.tab}
            >
              <View style={isAddButton ? [styles.addButton, { backgroundColor: colors.primary_buttonbackground }] : null}>
                <Ionicons
                  name={iconName}
                  size={sizeIcon}
                  color={isFocused ? colors.secondary_iconcolor : colors.primary_iconcolor}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
    marginHorizontal: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: 65,
    height: 65,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
