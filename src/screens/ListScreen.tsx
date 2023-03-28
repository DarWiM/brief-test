import React, {FunctionComponent, useCallback, useState} from 'react';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import useInterval from '../hooks/useInterval';
import useEventsFetch from '../hooks/useEventsFetch';
import ListItem, {ListItemType} from '../components/ListItem';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../components/NavigationRoot';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';

const FETCH_INTERVAL = 30 * 1000;

const Separator: FunctionComponent = () => <View style={styles.separator} />;

const safeAreaEdges: Edge[] = ['right', 'left', 'bottom'];

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'List'>;

const ListScreen: FunctionComponent<ScreenProps> = ({navigation}) => {
  const {data, loading, fetch} = useEventsFetch();

  const [interval, setInterval] = useState<number | null>(null);

  const setIntervalWithDebug = useCallback((value: null | number) => {
    console.log(value === null ? 'clear interval' : 'start interval', value);
    setInterval(value);
  }, []);

  useInterval(fetch, interval);

  useFocusEffect(
    useCallback(() => {
      console.log('focus in');

      fetch().finally(() => {
        setIntervalWithDebug(FETCH_INTERVAL);
      });

      return () => {
        console.log('focus out');
        setIntervalWithDebug(null);
      };
    }, [fetch, setIntervalWithDebug]),
  );

  const renderItem: ListRenderItem<ListItemType> = useCallback(
    ({item, index}) => {
      return (
        <ListItem
          ordinalNumber={index + 1}
          data={item}
          onPress={() => navigation.navigate('Details', {id: item.id})}
        />
      );
    },
    [navigation],
  );

  const keyExtractor = useCallback((item: ListItemType) => item.id, []);

  const onRefresh = useCallback(async () => {
    setIntervalWithDebug(null);
    await fetch();
    setIntervalWithDebug(FETCH_INTERVAL);
  }, [fetch, setIntervalWithDebug]);

  return (
    <SafeAreaView style={styles.container} edges={safeAreaEdges}>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={renderItem}
        refreshing={loading}
        onRefresh={onRefresh}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  separator: {
    height: 8,
  },
});

export default ListScreen;
