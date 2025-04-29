import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../../styles/theme/ThemeContext';
import { fonts } from '../../styles/theme/fonts';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('Recetas');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = ['Recetas', 'Categorías', 'Grupos'];
  const { colors } = useTheme();

  const getPlaceholder = () => {
    switch (activeTab) {
      case 'Recetas':
        return 'Buscar recetas...';
      case 'Categorías':
        return 'Buscar categorías...';
      case 'Grupos':
        return 'Buscar grupos...';
      default:
        return 'Buscar...';
    }
  };

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      {/* SearchBar dinámica */}
      <View style={[styles.searchContainer]}>
        <TextInput
          style={{fontFamily: 'System',fontSize:20, color: colors.regular_textcolor, backgroundColor: colors.search_backgroundcolor, ...styles.searchInput}}
          placeholder={getPlaceholder()}
          placeholderTextColor={colors.regular_textcolor}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Tabs arriba */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (

          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tabButton,
              activeTab === tab && {borderBottomColor: colors.primary_color, borderBottomWidth: 2},
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && {color: colors.primary_color, fontWeight: 'bold'},
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Contenido dinámico según tab */}
      <View style={styles.contentContainer}>
        {activeTab === 'Recetas' && <Text>Contenido de Recetas</Text>}
        {activeTab === 'Categorías' && <Text>Contenido de Categorías</Text>}
        {activeTab === 'Grupos' && <Text>Contenido de Grupos</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  searchInput: {
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#007bff',
  },
  tabText: {
    fontSize: 22,
    color: '#666',
  },
  activeTabText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
