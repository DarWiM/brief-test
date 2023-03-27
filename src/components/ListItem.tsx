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
};

const ListItem: FunctionComponent<ListItemProps> = ({data, ...props}) => {
  const {colors} = useTheme();
  return (
    <TouchableHighlight
      {...props}
      underlayColor={getColorWithOpacity(colors.primary, 0.25)}
      style={[{backgroundColor: colors.card}, styles.container]}>
      <Text style={[{color: colors.text}, styles.text]}>{data.id}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
  },
  text: {},
});

export default ListItem;
