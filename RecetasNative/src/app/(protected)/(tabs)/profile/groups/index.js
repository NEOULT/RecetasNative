import { StyleSheet, Text, View, ActivityIndicator, Animated, Pressable } from 'react-native';
import { useState, useRef, useEffect, useCallback } from 'react';
import GroupCardList from '../../../../../components/GroupCardList';
import { ApiService } from '../../../../../services/ApiService';
import { useApiMessage } from '../../../../../hooks/useApiMessage';
import InfoBox from '../../../../../components/common/InfoBox';
import { getUserId } from '../../../../../hooks/useGetUserId.js';
import { useRouter } from 'expo-router';
import ThemedText from '../../../../../components/common/ThemedText.js';
import ModalCreateGroup from '../../../../../components/CreateGroupModal.js';

const api = new ApiService();

export default function GroupsProfileScreen() {

  const [ isVisible, setIsVisible ] = useState(false);
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState('Todas');
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, hasMore: true });
  const { info, callApiWithMessage, clearInfo } = useApiMessage();
  const [loading, setLoading] = useState(true); 

  const fetchGroups = useCallback(async (pageToFetch = 1) => {
    setLoading(pageToFetch === 1);
    const userId = await getUserId();
    try {
      let response;
      if (selectedTag === 'Publicas') {
        response = await callApiWithMessage(() =>
          api.getPaginatePublicGroupsByUser(pageToFetch, 10, userId)
        );
      } else if (selectedTag === 'Privadas') {
        response = await callApiWithMessage(() =>
          api.getPaginatePublicGroupsByUser(pageToFetch, 10, userId, false)
        );
      } else {
        response = await callApiWithMessage(() =>
          api.getPaginateGroupsByUser(pageToFetch, 5, userId)
        );
      }

      clearInfo();

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
      setGroups([]);
    } finally {
      setLoading(false);
    }
  }, [selectedTag]);

  useEffect(() => {
    fetchGroups(1);
  }, [selectedTag, fetchGroups]);

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

  function SelectTags({ name = "Tag" }) {
    const isSelected = selectedTag === name;
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(scale, {
        toValue: 0.8,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Pressable
        onPress={() => setSelectedTag(name)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          styles.tags,
          isSelected && styles.tagPressed,
          pressed && { backgroundColor: 'rgba(249, 215, 170, 0.5)' }
        ]}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <Text style={[
            styles.tagText,
            isSelected && { fontWeight: 'bold' }
          ]}>
            {name}
          </Text>
        </Animated.View>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <InfoBox 
        message={info.message} 
        type={info.type} 
        onHide={clearInfo} 
        duration={2000} 
      />

      <ModalCreateGroup defaultValues= {selectedGroup} isVisible={isVisible} onSuccess={()=> fetchGroups(1)} onClose={()=> setIsVisible(false) } title='         Editar Grupo' />

      <View style={styles.row}>
        <SelectTags name="Todas" />
        <SelectTags name="Publicas" />
        <SelectTags name="Privadas" />
      </View>

      {loading ?
      
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF9100" />
      </View>

      : (groups.length === 0 ?

        <View style={styles.loaderContainer}>
            <ThemedText>No hay grupos disponibles</ThemedText>
        </View>

        :

        <GroupCardList
          groups={groups}
          onEndReached={handleLoadMore}
          isFetchingMore={info.loading && pagination.page > 1}
          onPressGroup={(groupData) => {
            const group  = JSON.stringify(groupData);
            router.navigate({
              pathname: `/profile/groups/${groupData._id}`,
              params: { userId: groupData.user_id, group}
            })}}
          onDeleteGroup={()=> fetchGroups(1)}
          onEditGroup={(group)=> {
              setIsVisible(true)
              setSelectedGroup(group);  
            }}
        />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tags: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#FF9100',
    paddingVertical: 2,
    paddingHorizontal: "6%",
    alignItems: 'center',
  },
  tagPressed: {
    backgroundColor: '#F9D7AA'
  },
  tagText: {
    color: '#FF9100',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 5,
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    marginBottom: 10,
    marginTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});