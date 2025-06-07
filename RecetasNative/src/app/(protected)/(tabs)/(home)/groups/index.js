import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import GroupCardList from '../../../../../components/GroupCardList';
import { useRouter } from 'expo-router';
import { ApiService } from '../../../../../services/ApiService';
import { useApiMessage } from '../../../../../hooks/useApiMessage';
import InfoBox from '../../../../../components/common/InfoBox';
import ThemedText from '../../../../../components/common/ThemedText';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';

const api = new ApiService();

export default function GroupScreen() {


  const router = useRouter();
  const [groups, setGroups] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, hasMore: true });
  const { info, callApiWithMessage, clearInfo } = useApiMessage();
  const [loading, setLoading] = useState(true);

  const fetchGroups = useCallback(async (pageToFetch = 1) => {
    try {
      const response = await callApiWithMessage(() =>
        api.paginateGroups(pageToFetch, 5)
      );

      clearInfo(); 
      // console.log("Fetched groups:", response.data.data);
      
      setGroups(prev =>
        pageToFetch === 1
          ? response?.data?.data
          : [...prev, ...response?.data?.data]
      );
      setPagination({
        page: pageToFetch,
        hasMore: pageToFetch < response.data.totalPages
      });
    } catch (error) {
      console.error("Error fetching groups:", error);
    } finally {
      setLoading(false);
    }
  }, [callApiWithMessage]);

  useFocusEffect(
    useCallback(() => {
      fetchGroups(1);
    }, [])
  );

  useEffect(() => {
    if (info.message) {
      const timeout = setTimeout(clearInfo, 3000);
      return () => clearTimeout(timeout);
    }
  }, [info.message, clearInfo]);

  const handleLoadMore = () => {
    if (pagination.hasMore && !info.loading) {
      fetchGroups(pagination.page + 1);
    }
  };

  const handleGroupPress = (group) => {
    console.log('Grupo seleccionado:', group.name);
  
    router.navigate({
      pathname: `/groups/${group._id}`,
      params: { group: JSON.stringify(group) }
    }
    );
  };

  if (loading) {
    return (
        <View style={[styles.screenContainer, styles.center]}>
            <ActivityIndicator size="large" color="#FF9100" />
        </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <InfoBox 
        message={info.message} 
        type={info.type} 
        onHide={clearInfo} 
        duration={2000} 
      />
      {groups?.length === 0 && !info.loading ? (
        <ThemedText type='title' textAlign='center'>No hay grupos disponibles</ThemedText>
      ) : (
        <GroupCardList
          groups={groups}
          onPressGroup={handleGroupPress}
          onEndReached={handleLoadMore}
          isFetchingMore={info.loading && pagination.page > 1}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },

});