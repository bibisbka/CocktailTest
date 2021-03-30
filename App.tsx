import React from 'react';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import StackNavigator from './src/navigation/StackNavigator';
import store from './src/redux/redux';

const App = () => {
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
};

export default App;
