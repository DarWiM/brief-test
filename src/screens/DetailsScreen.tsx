import React, {FunctionComponent} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {useAppSelector} from '../store';
import {selectDataItemById} from '../store/slices/eventsSlice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../components/NavigationRoot';
import {useTheme} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {},
});

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen: FunctionComponent<ScreenProps> = ({navigation, route}) => {
  const {colors} = useTheme();
  const data = useAppSelector(selectDataItemById(route.params.id));
  return (
    <ScrollView style={styles.container}>
      <Text style={[{color: colors.text}, styles.text]}>{data?.id}</Text>
    </ScrollView>
  );
};

export default DetailsScreen;
