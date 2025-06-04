import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import GroupCardList from '../../../../../components/GroupCardList';
import { useRouter } from 'expo-router';
import { ApiService } from '../../../../../services/ApiService';
import { useApiMessage } from '../../../../../hooks/useApiMessage';
import InfoBox from '../../../../../components/common/InfoBox';

const api = new ApiService();
const router = useRouter();

export default function GroupScreen() {
  const [groups, setGroups] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, hasMore: true });
  const { info, callApiWithMessage, clearInfo } = useApiMessage();

  const fetchGroups = useCallback(async (pageToFetch = 1) => {
    try {
      const response = await callApiWithMessage(() =>
        api.paginateGroups(pageToFetch, 5)
      );
      console.log("Fetched groups:", response.data.data);
      
      setGroups(prev =>
        pageToFetch === 1
          ? response.data.data
          : [...prev, ...response.data.data]
      );
      setPagination({
        page: pageToFetch,
        hasMore: pageToFetch < response.data.totalPages
      });
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  }, [callApiWithMessage]);

  useEffect(() => {
    fetchGroups(1);
  }, []);

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
    console.log('Grupo seleccionado:', group.title);
    router.navigate(`/groups/${group.id}`);
  };

  return (
    <View style={styles.screenContainer}>
      <InfoBox 
        message={info.message} 
        type={info.type} 
        onHide={clearInfo} 
        duration={2000} 
      />
      {groups.length === 0 && !info.loading ? (
        <Text>No se encontraron grupos</Text>
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
});