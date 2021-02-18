import 'react-native-gesture-handler';
import * as React from 'react';
import store from './configs/store';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

import {stackRoutes} from './configs/stackRoutes';
import {Provider} from 'react-redux';
import {Root} from 'native-base';

const Stack = createStackNavigator();
console.disableYellowBox = true;
export default function App() {
  return (
    <Provider store={store}>
      <Root>
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            {stackRoutes.map((route, index) => (
              <Stack.Screen
                key={index}
                name={route.name}
                component={route.component}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    </Provider>
  );
}
