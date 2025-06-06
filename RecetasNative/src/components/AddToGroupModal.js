import {View ,Text, FlatList, StyleSheet,Pressable, Image} from 'react-native';
import SlideModal from './common/SlideModal.js';
import {ApiService} from '../services/ApiService.js';
import { useEffect, useState, useCallback} from 'react';
import { useApiMessage } from '../hooks/useApiMessage.js';
import ThemedText from './common/ThemedText.js';
import InfoBox from './common/InfoBox.js';

const api = new ApiService();

export default function AddToGroupModal({isVisible, onClose, data}) {

    const [groups, setGroups] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, hasMore: true });
    const { info, callApiWithMessage, clearInfo } = useApiMessage();

    const fetchGroups = useCallback(async (pageToFetch = 1) => {
        try {
            const response = await callApiWithMessage(() =>
            api.paginateGroups(pageToFetch, 10)
            );
            
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

    const fetchAddToGroup = async (groupId) => {
        try {
            const response = await callApiWithMessage(() =>
                api.addRecipeToGroup(groupId, data)
            );

            if (response.success) {
                onClose();
            }
        } catch (error) {
            console.error("Error adding to group:", error);
        }
    }

    function renderGroupItem({ item }) { 
        return (
            <Pressable style={styles.groupItem} onPress={() => fetchAddToGroup(item._id)}>
                <Image source ={{ uri: item.image}} style={styles.image}/>
                <ThemedText style={styles.text}>{item.description}</ThemedText>
            </Pressable>
        );
    }

    return (

        <>
        {/* <InfoBox 
            message={info.message} 
            type={info.type} 
            onHide={clearInfo} 
            duration={2000} 
        /> */}
        <SlideModal height={"70%"} isVisible={isVisible} onClose={onClose} title="       Añadir a un grupo">

            <View style={{flex: 1}}>
                <FlatList
                    data={groups}
                    renderItem={renderGroupItem}
                    keyExtractor={(item) => item._id}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={ info.loading && pagination.page > 1 ? (
                        <ActivityIndicator size="small" color="#FF9100" />
                    ) : null}
                />
            </View>
        </SlideModal>

        </>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 75,
        height: 65,
        borderRadius: 10,
    },
    groupItem: {
        flexDirection: 'row',
        gap: 15,
        width: '80%',
        alignItems: 'flex-start',
        marginVertical: 10,
    },
    text:{
        width: '45%',
    }
});