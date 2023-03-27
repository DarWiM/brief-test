import React, {FunctionComponent} from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListScreen from '../screens/ListScreen';
import DetailsScreen from '../screens/DetailsScreen';

export type RootStackParamList = {
  List: undefined;
  Details: {id: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export type NavigationRootProps = {
  isDarkMode?: boolean;
};

const NavigationRoot: FunctionComponent<NavigationRootProps> = ({
  isDarkMode = false,
}) => {
  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="List"
          component={ListScreen}
          options={{title: 'Events'}}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{title: 'Event Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationRoot;
