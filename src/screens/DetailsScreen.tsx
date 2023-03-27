import React, {FunctionComponent} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useAppSelector} from '../store';
import {selectDataItemById} from '../store/slices/eventsSlice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../components/NavigationRoot';
import {useTheme} from '@react-navigation/native';
import getColorWithOpacity from '../functions/getColorWithOpacity';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  rowTitle: {
    fontWeight: 'bold',
    marginRight: 16,
  },
  colTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 4,
  },
  col: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexShrink: 1,
    flexGrow: 0,
  },
  fakeTextArea: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    flex: 1,
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  headerLeftCol: {
    flex: 1,
    marginRight: 4,
  },
  headerRightCol: {
    marginBottom: 4,
    maxWidth: '35%',
    minWidth: 90,
    alignItems: 'center',
    padding: 8,
  },
});

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen: FunctionComponent<ScreenProps> = ({route}) => {
  const {colors} = useTheme();
  const data = useAppSelector(selectDataItemById(route.params.id));
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeftCol}>
          <View style={[styles.row, {backgroundColor: colors.card}]}>
            <Text style={[styles.rowTitle, {color: colors.text}]}>id:</Text>
            <Text style={[styles.text, {color: colors.text}]}>{data?.id}</Text>
          </View>

          <View style={[styles.row, {backgroundColor: colors.card}]}>
            <Text style={[styles.rowTitle, {color: colors.text}]}>public:</Text>
            <Text style={[styles.text, {color: colors.text}]}>
              {`${data?.public}`}
            </Text>
          </View>
        </View>

        <View style={[styles.headerRightCol, {backgroundColor: colors.card}]}>
          <Image source={{uri: data?.actor.avatar_url}} style={styles.image} />

          <Text style={[styles.text, {color: colors.text}]} numberOfLines={1}>
            {data?.actor.login}
          </Text>
        </View>
      </View>

      <View style={[styles.row, {backgroundColor: colors.card}]}>
        <Text style={[styles.rowTitle, {color: colors.text}]}>created_at:</Text>
        <Text style={[styles.text, {color: colors.text}]}>
          {data?.created_at}
        </Text>
      </View>

      <View style={[styles.row, {backgroundColor: colors.card}]}>
        <Text style={[styles.rowTitle, {color: colors.text}]}>repo:</Text>
        <Text style={[styles.text, {color: colors.text}]}>
          {data?.repo.name}
        </Text>
      </View>

      <View style={[styles.row, {backgroundColor: colors.card}]}>
        <Text style={[styles.rowTitle, {color: colors.text}]}>type:</Text>
        <Text style={[styles.text, {color: colors.text}]}>{data?.type}</Text>
      </View>

      <View style={[styles.col, {backgroundColor: colors.card}]}>
        <Text style={[styles.colTitle, {color: colors.text}]}>payload:</Text>
        <ScrollView bounces={false} overScrollMode={'never'}>
          <Text
            style={[
              styles.fakeTextArea,
              {
                color: colors.text,
                backgroundColor: getColorWithOpacity(colors.background, 0.5),
              },
            ]}>
            {JSON.stringify(data?.payload, null, 2)}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default DetailsScreen;
