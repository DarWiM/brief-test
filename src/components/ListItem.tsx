import React, {FunctionComponent} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableHighlightProps,
} from 'react-native';
import useEventsFetch from '../hooks/useEventsFetch';
import {useTheme} from '@react-navigation/native';
import getColorWithOpacity from '../functions/getColorWithOpacity';

export type ListItemType = ReturnType<typeof useEventsFetch>['data'][0];

export type ListItemProps = Omit<
  TouchableHighlightProps,
  'style' | 'underlayColor'
> & {
  data: ListItemType;
  ordinalNumber: number;
};

const ListItem: FunctionComponent<ListItemProps> = ({
  data,
  ordinalNumber,
  ...props
}) => {
  const {colors} = useTheme();
  return (
    <TouchableHighlight
      {...props}
      underlayColor={getColorWithOpacity(colors.primary, 0.25)}
      style={[{backgroundColor: colors.card}, styles.container]}>
      <>
        <Text
          style={[
            styles.index,
            {
              color: colors.text,
              backgroundColor: getColorWithOpacity(colors.background, 0.5),
            },
          ]}>
          {ordinalNumber}
        </Text>

        <Text style={[{color: colors.text}, styles.text]}>
          <Text style={styles.title}>id: </Text>
          {data.id}
        </Text>

        <Text style={[{color: colors.text}, styles.text]}>
          <Text style={styles.title}>created_at: </Text>
          {data.created_at}
        </Text>

        <Text style={[{color: colors.text}, styles.text]}>
          <Text style={styles.title}>type: </Text>
          {data.type}
        </Text>

        <Text style={[{color: colors.text}, styles.text]}>
          <Text style={styles.title}>repo: </Text>
          {data.repo.name}
        </Text>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
  },
  text: {},
  title: {
    fontWeight: 'bold',
  },
  index: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 24,
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default ListItem;
